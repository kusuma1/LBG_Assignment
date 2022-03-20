const {Given,When, Then, After, Before} = require('@cucumber/cucumber')
const {expect} = require("chai");
const { until,By, Builder} = require('selenium-webdriver');

let driver;

Before(async()=>{
               //launch the browser
             driver = await new Builder().forBrowser("chrome").build();
})

After(async()=>{

   //close the browser
   await driver.quit()

})

         Given('I have Lloyds bank home url {string}', async (url) => {
          //navigate to given URL
           await driver.get(url);
         });


         Then('I verify title of the page is {string}', async (homePageTitle) =>{
         var title=  await driver.getTitle();
         expect(homePageTitle).equals(title);
         });

         When('I click on the Branch finder', function() {
            
          driver.findElement(By.linkText("Branch Finder")).click();
              });

         Then('I land on {string} page', async (BranchFinderTitle) => {
       
         var SearchPageTitle= await driver.wait(until.elementLocated(By.className("Locator-title"))).getText();
             expect(SearchPageTitle).equals(BranchFinderTitle);
             });

             When('I Enter {string} and search in the search box', async (string)=>{
           
               await driver.findElement(By.className("search-input Locator-input js-locator-input")).sendKeys(string);
               await driver.findElement(By.className("search-button Locator-button Locator-button--search")).click();
             });

             Then('Select the last result from the list and verify Name of the branch, Address and the Days Branch is closed', async ()=> {

              //Using the step stored the last branch info from the list 
              let detailsOfTheBranchOnList=  await driver.wait(until.elementLocated(By.css("#js-yl-309462 > article"))).getText();     
              
              //Clicked the last result
              await driver.wait(until.elementLocated(By.xpath("//*/div/div[2]/ol//li[last()] /article/div[1]/h3/a"))).click();

              //Using these steps stored the branch info of the selected branch 
              let NameOfTheBankOnPage = await driver.wait(until.elementLocated(By.css("#location-name > span.LocationName-brand"))).getText(); 
              let NameOfTheBranchOnPage = await driver.wait(until.elementLocated(By.css("#location-name > span.LocationName-geo"))).getText(); 
              let Address = await driver.wait(until.elementLocated(By.xpath("//*/div/div[1]/div[1]/div[2]/address/div[1]/span"))).getText(); 

              //Verifying the branch details 
              let Days = await driver.wait(until.elementLocated(By.xpath("//*/div/div/table"))).getText(); 
              expect(detailsOfTheBranchOnList).contains(NameOfTheBankOnPage+ " "+ NameOfTheBranchOnPage);
              expect(detailsOfTheBranchOnList).contains(Address);
              expect(Days).contains("Saturday Closed" && "Sunday Closed");
            });
    
  
          
          