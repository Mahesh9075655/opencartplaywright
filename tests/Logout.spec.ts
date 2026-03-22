import {test, expect} from '@playwright/test';
import {Homepage} from '../pages/HomePage';
import {TestConfig} from '../test.config';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { LoginPage } from '../pages/LoginPage';

/*
Test Case: User Logout

Tags: @master @regression

Steps:
1) Navigate to the application form
2) Go to Login page from Home page
3) Login with Valid Credentials
4) Verify "My Account" Page
5) Click on Logout Link
6) Click on continue button
7) Verify user is redirected to Home page

*/

//Delcare Shared Variables

let config: TestConfig;
let HomePage: Homepage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;


//Setup before each test

test.beforeEach(async ({page})=>
{
     config=new TestConfig();  //Load test Config

     await page.goto(config.appUrl); //Step1: Navigate to the App Url
     
     //Initialize Page Objects
     HomePage=new Homepage(page);
     loginPage=new LoginPage(page);
     myAccountPage=new MyAccountPage(page);
     logoutPage=new LogoutPage(page);

});

test.afterEach(async ({page})=>{
    await page.close(); //close the browser tab (helps keep tests clean)
})


test("User Logout test @master @regression", async()=>{

    //Step 2: Navigate to Login Page
    await HomePage.clickMyAccount();
    await HomePage.clickLogin();

    //Step 3: Perform Login using Valid Credentials
    await loginPage.login(config.email, config.password);
    
    //Step 4: Verify Succesfull Login
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

    //Step 5: Click Logout, Which Returns Logoutpage instance
    logoutPage= await myAccountPage.clickLogout();

    //Step 6: Verify "Continue" button is visible before clicking
    expect(await logoutPage.isContinueButtonIsVisible()).toBe(true);

    //Step 7: Click Continue nad verify redirection to Homepage
    HomePage= await logoutPage.clickContinue();
    expect(await HomePage.isHomePageExists()).toBe(true);


 })



