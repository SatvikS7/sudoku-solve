import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ppt = require("puppeteer");

window.addEventListener('DOMContentLoaded', init);
function init() {
  (async () => {
      const browser = await ppt.launch();
      const page = await browser.newPage();

      await page.goto('https://www.nytimes.com/puzzles/sudoku', {waitUntil: "domcontentloaded",});
      //let btn = await document.getElementsByClassName('_momentButton_m3x3m_1 _primary_m3x3m_113 _default_m3x3m_1')
      //await page.click(btn);
      await setTimeout(() => {
          console.log("Delayed for 5 second.");
        }, "5000");
      await page.click(document.getElementsByName("Easy"));     
      await page.screenshot({path: 'test.png'});
      await browser.close();
  })();
}