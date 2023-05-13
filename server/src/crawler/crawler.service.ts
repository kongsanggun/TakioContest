import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import puppeteer, { executablePath } from 'puppeteer-core';
import { Compe } from 'src/compe/entities/compe.entity';
import { Entrant } from 'src/entrant/entities/entrant.entity';
import { Repository } from 'typeorm';

// TODO : 추후 환경 변수 적용 및 최적화 예정

@Injectable()
export class CrawlerService {
  constructor(
    @InjectRepository(Compe)
    private readonly compeRepository: Repository<Compe>,
    @InjectRepository(Entrant)
    private readonly entrantRepository: Repository<Entrant>,
  ) {}
  async crawler(): Promise<any> {
    // 1. compe 정보 가져오기 (기준을 어제, 범위 시작 <= 어제 <= 종료 )
    const compeData = this.getCompe();
    console.log(compeData);
    for (const tmp of await compeData) {
      console.log(tmp.compeId);
    }
    // 2. compe에서 설정한 모든 랭킹 점수 가져오기
    const entrantData = await this.getRanking(await compeData);
    console.log(entrantData);
    // 3. 가져온 점수를 통하여 entry 갱신하기
    return 'Done!';
  }

  private async getCompe() {
    try {
      return await this.compeRepository
        .createQueryBuilder('compe')
        .orderBy({
          'compe.compeId': 'ASC',
        })
        .getMany();
    } catch (error) {
      throw new ServiceUnavailableException(
        '랭킹을 불러오는 도중 오류가 발생했습니다.',
      );
    }
  }

  private async getRanking(compeData: Compe[]): Promise<any> {
    const result = [];
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: false,
      executablePath: executablePath('chrome'),
    });
    const page = await browser.newPage();
    await page.goto(`https://donderhiroba.jp`);

    const loginElement1 = await page.$('#login_form > div');
    await loginElement1.click();

    try {
      // 해당 콘텐츠가 로드될 때까지 대기
      await page.waitForSelector('#mail', { timeout: 2000 });
    } catch (error) {
      console.log('에러 발생: ' + error);
      return null;
    }

    await page.type('#mail', process.env.CRA_EMAIL);
    await page.type('#pass', process.env.CRA_PASS);

    const wait = new Promise((r) => setTimeout(r, 2000));
    await wait;

    const loginElement2 = await page.$('#btn-idpw-login');
    await loginElement2.click();

    try {
      await page.waitForSelector('#form_user1 > div > a', { timeout: 5000 });
    } catch (error) {
      console.log('에러 발생: ' + error);
      return null;
    }
    await wait;
    const loginElement3 = await page.$('#form_user1 > div > a');
    await loginElement3.click();

    try {
      await page.waitForSelector(
        '#mydon_area > div:nth-child(4) > div.mydon_image > img',
        { timeout: 5000 },
      );
    } catch (error) {
      console.log('에러 발생: ' + error);
      return null;
    }

    for (const index of compeData) {
      console.log(index.compeId);
      await page.goto(
        `https://donderhiroba.jp/compe_ranking.php?compeid=${index.compeId}`,
      );
      console.log('a');
      await page.waitForSelector('#mater > div', { timeout: 5000 });
      console.log('b');

      const data = await page.evaluate(() => {
        const result = [];
        console.log('a');
        const len = document.querySelectorAll('#mater > div').length;

        for (let i = 0; i < len; i++) {
          const names = document
            .querySelector(
              `#mater > div:nth-child(${
                i + 1
              }) > div.clearfix.player-info > div`,
            )
            .textContent.split('\n\t\t');
          const name = names[0];
          const total = names[1];

          const userImg = document
            .querySelector(
              `#mater > div:nth-child(${
                i + 1
              }) > div.clearfix.player-info > img`,
            )
            .getAttribute('src');
          const id = userImg.slice(-12);
          console.log('a');

          const songDetail = [];

          for (let idx = 0; idx < 3; idx++) {
            const song = document
              .querySelector(
                `#mater > div:nth-child(${
                  i + 1
                }) > div.slide-block > div.block > div:nth-child(${idx + 1})`,
              )
              .textContent.replace('\n\t\t\t\t\t\t\t\t', '')
              .split('\n\t\t\t\t');

            const songScore = song[1];

            songDetail.push(songScore);
          }

          result.push({
            id: id,
            name: name,
            entryType: index.entryType,
            songDetail: songDetail,
          });
        }

        return result;
      });
      result.push(data);
    }

    await browser.close();

    return result;
  }
}
