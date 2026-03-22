
/*
Test Case: Login with Valid Credentials

Tags: @master, @snity, @regression

Steps: 
1) Navigate to the Application URL
2) Navigate to login page via Home page
3) Enter the Valid Credentials and log in
4) Verify Succesfull Login by checking "My Account" page presence

*/

import{test, expect} from '@playwright/test';
import {Homepage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let config: TestConfig;
let HomePage: Homepage;
let loginpage: LoginPage;
let myAccountPage: MyAccountPage;

//This hook Runs before Each test
test.beforeEach(async ({page})=>{
    config =new TestConfig();          //Load Config (Url, Credentials)
    await page.goto(config.appUrl);        //Navigate to the base URL

    //Initialize page Objects
    HomePage=new Homepage(page);
    loginpage=new LoginPage(page);
    myAccountPage=new MyAccountPage(page);

});

//Optional Cleanup after each Test
test.afterEach(async ({page})=>{
    await page.close();               //Close the Browser tab (Good Practise in local/dev run)
})

test("User Login test @master, @sanity, @regression", async({page})=>{

    //Navigate to login page via Home page
    await HomePage.clickMyAccount();
    await HomePage.clickLogin();

    //Enter the Valid Credentials and log in
    await loginpage.login(config.email, config.password);

    //Verify Succesfull Login by checking "My Account" page presence
    const isLoggedIn=await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy();
})

