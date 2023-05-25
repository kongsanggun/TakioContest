import {
  Injectable,
  ServiceUnavailableException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import puppeteer, { executablePath } from 'puppeteer';
import { Compe } from 'src/compe/entities/compe.entity';
import { ConInfo } from 'src/conInfo/entities/conInfo.entity';
import { UpdateEntrantDto } from 'src/entrant/admin/dto/updateEntrant.dto';
import { Entrant } from 'src/entrant/entities/entrant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrawlerService {
  constructor(
    private logger: Logger,
    @InjectRepository(Compe)
    private readonly compeRepository: Repository<Compe>,
    @InjectRepository(Entrant)
    private readonly entrantRepository: Repository<Entrant>,
    @InjectRepository(ConInfo)
    private readonly coninfoRepository: Repository<ConInfo>,
  ) {}
  async crawler(): Promise<any> {
    let count = 3;
    const contestId = process.env.CONTEST_ID;

    /*this.logger.debug('0. 대회날짜 확인');
    const coninfo = this.getConInfo(contestId);
    if ((await coninfo).length == 0) {
      throw new ServiceUnavailableException('해당 대회 날짜가 아닙니다.');
    }*/

    this.logger.debug(
      '1. compe 정보 가져오기 (기준을 어제, 범위 시작 <= 어제 <= 종료',
    );

    const compeData = this.getCompe();

    this.logger.debug('2. compe에서 설정한 모든 랭킹 점수 가져오기');

    let entrantData = await this.getRanking(await compeData);

    while (entrantData === null && count > 0) {
      this.logger.error(`에러가 발생하여 다시 시작 ::: ${count}번 남음`);
      entrantData = await this.getRanking(await compeData);
      count--;
    }
    if (count <= 0) {
      throw new ServiceUnavailableException('데이터 불러오기 실패');
    }
    this.logger.log(`데이터 불러오기 결과 : ${entrantData}`);

    this.logger.debug('3. 가져온 점수를 통하여 entry 갱신하기');
    await this.updateEntrant(await entrantData);

    this.logger.debug('4. 만료된 entry 삭제');
    await this.deleteEntrant();
    return 'Done!';
  }

  private async getConInfo(contestId: string) {
    try {
      return await this.coninfoRepository
        .createQueryBuilder('coninfo')
        .where('coninfo.Id = :contestId', {
          contestId: contestId,
        })
        .andWhere(':now between coninfo.startAt and coninfo.endAt', {
          now: new Date().toISOString().split('T')[0],
        })
        .getMany();
    } catch (error) {
      throw new ServiceUnavailableException(
        '랭킹을 불러오는 도중 오류가 발생했습니다.',
      );
    }
  }

  private async getCompe() {
    try {
      return await this.compeRepository
        .createQueryBuilder('compe')
        .orderBy({
          'compe.compeId': 'ASC',
        })
        .andWhere(':now between compe.startAt and compe.endAt', {
          now: new Date().toISOString().split('T')[0],
        })
        .getMany();
    } catch (error) {
      throw new ServiceUnavailableException(
        '랭킹을 불러오는 도중 오류가 발생했습니다.',
      );
    }
  }

  private async updateEntrant(entrantData: []) {
    for (const data of entrantData) {
      const Entrant = await this.findEntrant(data);
      this.logger.log(`참가자 조회 결과 : ${Entrant}`);
      if (!Entrant) {
        continue;
      }

      const songScore1 =
        Number(data['songScore1']) > Number((await Entrant).songScore1)
          ? Number(data['songScore1'])
          : Number((await Entrant).songScore1);
      const songScore2 =
        Number(data['songScore2']) > Number((await Entrant).songScore2)
          ? Number(data['songScore2'])
          : Number((await Entrant).songScore2);
      const songScore3 =
        Number(data['songScore3']) > Number((await Entrant).songScore3)
          ? Number(data['songScore3'])
          : Number((await Entrant).songScore3);

      await this.update({
        taikoId: Entrant.taikoId,
        songScore1: songScore1,
        songScore2: songScore2,
        songScore3: songScore3,
        entryName: Entrant.entryName,
        contacts: Entrant.contacts,
        entryType: Entrant.entryType,
      });
      this.logger.log('갱신 완료');
    }
  }

  private async deleteEntrant() {
    await this.entrantRepository
      .createQueryBuilder('entrant')
      .delete()
      .where('songScore1 = 0 AND songScore2 = 0 AND songScore3 = 0')
      .andWhere(':now >= expiredAt', {
        now: new Date().toISOString().split('T')[0],
      })
      .execute();

    return null;
  }

  private async findEntrant(data: any) {
    const taikoId = data.taikoId;
    const entryType = data.entryType;

    return await this.entrantRepository
      .createQueryBuilder('score')
      .where('score.taikoId = :taikoId', { taikoId: taikoId })
      .andWhere('score.entryType = :entryType', { entryType: entryType })
      .getOne();
  }

  private async update(dto: UpdateEntrantDto) {
    this.logger.log(`갱신 DTO : ${dto}`);
    try {
      const taikoId = dto.taikoId;
      await this.entrantRepository
        .createQueryBuilder('entrant')
        .update('entrant')
        .set(dto)
        .where('taikoId = :taikoId', { taikoId: taikoId })
        .execute();
    } catch (error) {
      throw new ServiceUnavailableException('갱신 중 에러가 발생했습니다.');
    }
  }

  private async getRanking(compeData: Compe[]): Promise<any> {
    const result = [];
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: 'new',
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
      this.logger.error('에러 발생: ' + error);
      await browser.close();
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
      this.logger.error('에러 발생: ' + error);
      await browser.close();
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
      this.logger.error('에러 발생: ' + error);
      await browser.close();
      return null;
    }

    try {
      for (const index of await compeData) {
        await page.goto(
          `https://donderhiroba.jp/compe_ranking.php?compeid=${index.compeId}`,
        );
        const entryType = index.entryType.toString();
        const data = await page.evaluate((entryType: string) => {
          const result = [];
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

            const userImg = document
              .querySelector(
                `#mater > div:nth-child(${
                  i + 1
                }) > div.clearfix.player-info > img`,
              )
              .getAttribute('src');
            const id = userImg.slice(-12);

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

              const songScore =
                song[1] === 'スコア未登録'
                  ? 0
                  : Number(song[1].replace('点', ''));
              songDetail.push(songScore);
            }

            result.push({
              taikoId: id,
              entryName: name,
              entryType: entryType,
              songScore1: songDetail[0],
              songScore2: songDetail[1],
              songScore3: songDetail[2],
            });
          }

          return result;
        }, entryType);
        for (const dataIndex of await data) {
          result.push(dataIndex);
        }
      }
    } catch (error) {
      this.logger.error('에러 발생: ' + error);
      await browser.close();
      return null;
    }
    return result;
  }
}
