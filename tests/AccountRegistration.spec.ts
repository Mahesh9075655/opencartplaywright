/*

Test Case Registration 

Tags: @master @sanity @regression 

Steps: 
1) Navigate to the Application URL
2) Go to 'My Account' and click 'Register'
3) Fill in registration details with random Data
4) Agree to Privacy Policy and submit the form
5) Validate the confirmation message
*/

import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let HomePage: Homepage;
let Registrationpage: RegistrationPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);  //Navigate to the App Url

    HomePage = new Homepage(page);
    Registrationpage = new RegistrationPage(page);
})

test.afterEach(async ({ page }) => {
    await page.close();

})

test("User registration test @master, @sanity, @regression", async ({ page }) => {



    //Go to 'My Account' and click 'Register'
    await HomePage.clickMyAccount();
    await HomePage.clikcRegister();



    await Registrationpage.setFirstName(RandomDataUtil.getFirstName());
    await Registrationpage.setLastName(RandomDataUtil.getLastName());
    await Registrationpage.setEmail(RandomDataUtil.getEmail());
    await Registrationpage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
    await Registrationpage.setPassword(password);
    await Registrationpage.setConfirmPassword(password);


    await Registrationpage.setPrivacyPolicy();

    await page.waitForTimeout(5000);

    await Registrationpage.clickContinueButton();

    const confirmationMsg = await Registrationpage.getConfirmationMsg();
    expect(confirmationMsg).toContain("Your Account Has Been Created!");

    await page.waitForTimeout(5000);

})

