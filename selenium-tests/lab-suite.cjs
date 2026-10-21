const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const base = process.env.BASE_URL || 'http://127.0.0.1:3108';
const output = path.resolve('selenium-results');
fs.mkdirSync(output, {recursive:true});
const results = [];
async function main() {
  const options = new chrome.Options().addArguments('--headless=new', '--window-size=1440,1000');
  if (process.env.CHROME_BINARY) options.setChromeBinaryPath(process.env.CHROME_BINARY);
  const builder = new Builder().forBrowser('chrome').setChromeOptions(options);
  if (process.env.CHROMEDRIVER) builder.setChromeService(new chrome.ServiceBuilder(process.env.CHROMEDRIVER));
  let driver;
  const field = id => driver.findElement(By.id(id));
  async function run(id, name, fn) {
    driver = await builder.build();
    try {
      await fn();
      fs.writeFileSync(path.join(output, id+'.png'), await driver.takeScreenshot(), 'base64');
      results.push({id,name,status:'PASS'}); console.log(`PASS ${id}: ${name}`);
    } catch (error) {
      fs.writeFileSync(path.join(output, id+'.png'), await driver.takeScreenshot(), 'base64');
      results.push({id,name,status:'FAIL',error:error.message}); console.error(`FAIL ${id}: ${error.message}`);
      process.exitCode=1;
    } finally { await driver.quit(); }
  }
  try {
    await run('TC01','Invalid login displays an error',async()=>{
      await driver.get(base+'/login.html');
      await field('email').sendKeys('invalid@example.com');
      await field('password').sendKeys('wrong');
      await driver.findElement(By.css('button[type="submit"]')).click();
      await driver.wait(until.elementTextIs(field('errorMessage'),'Invalid email or password'),5000);
      assert.equal(await field('errorMessage').getText(),'Invalid email or password');
    });
    await run('TC02','Valid login opens event selection',async()=>{
      await driver.get(base+'/login.html');
      await field('email').sendKeys('student@gmail.com');
      await field('password').sendKeys('123456');
      await driver.findElement(By.css('button[type="submit"]')).click();
      await driver.wait(until.urlContains('/selection.html'),5000);
      assert.equal(await driver.executeScript('return sessionStorage.getItem("userEmail")'),'student@gmail.com');
    });
    await run('TC03','Selected event reaches the registration form',async()=>{
      await driver.get(base+'/selection.html');
      await driver.findElement(By.css('input[value="techfest"]')).click();
      await driver.findElement(By.css('button[type="submit"]')).click();
      await driver.wait(until.urlContains('/registration.html'),5000);
      assert.match(await field('selectedEvent').getText(),/TechFest 2026/);
    });
    await run('TC04','Invalid phone number is rejected',async()=>{
      await driver.get(base+'/registration.html');
      await field('phone').click();
      await field('phone').sendKeys('0012345678');
      assert.equal(await field('phone').getAttribute('value'),'0012345678');
      assert.equal(await driver.executeScript('return arguments[0].checkValidity()',await field('phone')),false);
      await field('phone').clear();
      await field('phone').sendKeys('12345678901');
      assert.equal(await driver.executeScript('return arguments[0].checkValidity()',await field('phone')),false);
    });
    await run('TC05','Successful registration displays confirmation',async()=>{
      await driver.get(base+'/registration.html');
      await field('fullName').click();
      await field('fullName').sendKeys('Lab Test User');
      await field('phone').click(); await field('phone').clear(); await field('phone').sendKeys('9876543210');
      await field('male').click();
      assert.equal(await field('fullName').getAttribute('value'),'Lab Test User');
      assert.equal(await field('phone').getAttribute('value'),'9876543210');
      assert.equal(await field('male').isSelected(),true);
      await driver.findElement(By.css('button[type="submit"]')).click();
      await driver.wait(until.elementTextIs(field('registrationMessage'),'Registration Successful'),5000);
      assert.equal(await field('registrationMessage').getText(),'Registration Successful');
    });
  } finally { fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2)); }
  console.log(`${results.filter(r=>r.status==='PASS').length}/${results.length} Selenium checks passed`);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
