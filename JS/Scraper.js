import puppeteer from "puppeteer";
import { solver } from "./SudokuSolver.js";

(async () => {
  try {
      //launch puppeteer 
      const browser = await puppeteer.launch({ 
          headless: false 
      });

      //wait for page to open
      const page = await browser.newPage();

      //go to website
      await page.goto('https://www.nytimes.com/puzzles/sudoku');

      //click easy difficulty and wait for page to load
      await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.locator('button ::-p-text(Hard)').click(),
      ]);     

      //get all cell elements
      var grid = await page.$$('[data-testid="sudoku-cell"]');

      var arr = [];
      var temp = [];

      //extract number if it exists, else push a 0
      for(const cell of grid) {
        var ele = await (await cell.getProperty("ariaLabel")).jsonValue();
        if(ele == "empty") {
          temp.push(0);
        } else {
          temp.push(parseInt(ele))
        }

        if(temp.length == 9) {
          arr.push(temp);
          temp = [];
        }
      }

      //close browser
      await browser.close();

      //run solver on the sudoku board
      console.log("Original: ");
      solver.printBoard(arr);
      solver.solve(arr);
  }
  catch (e) {
      console.log("Error",e);
  }
})();



