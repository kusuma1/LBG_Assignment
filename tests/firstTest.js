const {Builder} = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");
async function example(){
  //launch the browser
  let driver = await new Builder().forBrowser("chrome").build();

  //navigate to application
  await driver.get("https://www.google.co.uk/");
}
example()