import puppeteer from "puppeteer";

(async () => {
  try {
      console.log('starting');
      const browser = await puppeteer.launch({ 
          headless: false 
      });
      console.log('one');
      const page = await browser.newPage();
      console.log('two');
      await page.goto('https://www.nytimes.com/puzzles/sudoku');
      console.log('three');
      await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.locator('button ::-p-text(Easy)').click(),
      ]);     
      console.log("Page is up");
      await page.screenshot({path: 'example.png'});
      await browser.close();
  }
  catch (e) {
      console.log("Error",e);
  }
})();