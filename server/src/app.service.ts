import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import puppeteer, { executablePath } from 'puppeteer-core';

// TODO : 추후 환경 변수 적용 및 최적화 예정

@Injectable()
export class AppService {
  async getRanking(): Promise<any> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
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
    await page.goto(
      `https://donderhiroba.jp/compe_ranking.php?compeid=${null}`,
    );
    await page.waitForSelector('#mater');

    const data = await page.evaluate(() => {
      const result = [];
      const len = document.querySelectorAll('#mater > div').length;

      for (let i = 0; i < len; i++) {
        const names = document
          .querySelector(
            `#mater > div:nth-child(${i + 1}) > div.clearfix.player-info > div`,
          )
          .textContent.split('\n\t\t');
        const name = names[0];
        const total = names[1];

        const userImg = document
          .querySelector(
            `#mater > div:nth-child(${i + 1}) > div.clearfix.player-info > img`,
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

          const songName = song[0];
          const songScore = song[1];

          songDetail.push({
            songName: songName,
            songScore: songScore,
          });
        }

        result.push({
          id: id,
          name: name,
          userImg: userImg,
          total: total,
          songDetail: songDetail,
        });
      }

      return result;
    });

    await browser.close();

    return data;
  }

  async searchUser(): Promise<any> {
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

    await page.goto(
      `https://donderhiroba.jp/user_search.php?exec=1&keyword=${null}`,
    );
    await page.waitForSelector('#container');

    const isError = await page.evaluate(() => {
      if (document.querySelector('#error') !== null) {
        return true;
      }
      return false;
    });

    if (isError) {
      await browser.close();
      return 'error';
    }

    await browser.close();
    return 'good';
  }
}
