import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { Homepage } from '../pages/HomePage';

//Load JSON Data from file logindata.json

const jsonpath="testdata/logindata.json";

const jsonTestData=DataProvider.getTestDataFromJson(jsonpath);

for(const data of jsonTestData)
{
    test(`Login Test with JSON data: ${data.testName} @datadriven`, async({page})=>{
        const config=new TestConfig();
        await page.goto(config.appUrl);

        const HomePage=new Homepage(page);
        await HomePage.clickMyAccount();
        await HomePage.clickLogin();

        const loginPage =new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if(data.expected.toLowerCase()==='success')
        {
            const myAccountPage=new MyAccountPage(page);

            const isLoggedIn=await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();
        }
        else
        {
            const errorMessage= await loginPage.getLoginErrorMessage();
            expect(errorMessage).toBe(" Warning: No match for E-Mail Address and/or Password.");

        }
    })
}




const csvpath="testdata/logindata.csv";

const csvTestData=DataProvider.getTestDataFromCsv(csvpath);

for(const data of csvTestData)
{
    test(`Login Test with csv data: ${data.testName} @datadriven`, async({page})=>{
        const config=new TestConfig();
        await page.goto(config.appUrl);

        const HomePage=new Homepage(page);
        await HomePage.clickMyAccount();
        await HomePage.clickLogin();

        const loginPage =new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if(data.expected.toLowerCase()==='success')
        {
            const myAccountPage=new MyAccountPage(page);

            const isLoggedIn=await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();
        }
        else
        {
            const errorMessage= await loginPage.getLoginErrorMessage();
            expect(errorMessage).toBe(" Warning: No match for E-Mail Address and/or Password.");

        }
    })
}