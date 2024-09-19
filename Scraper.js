const ppt = require("puppeteer");
(async () => {
    const browser = await ppt.launch();
    const page = await browser.newPage();

    await page.goto('https://www.nytimes.com/puzzles/sudoku');
    await page.screenshot({path: 'test.png'});
    await browser.close();
})();