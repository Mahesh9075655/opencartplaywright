import {Page, Locator, expect} from '@playwright/test';
import  {LogoutPage} from '../pages/LogoutPage';

export class MyAccountPage{
    private readonly page: Page;

    //Locators using CSS Selectors
    private readonly msgHeading: Locator;
    private readonly lnkLogout: Locator;

    constructor(page:Page){
        this.page=page;

        //Initialize Locators with CSS selectors
        this.msgHeading=page.locator("h2:has-text('My Account')");
        this.lnkLogout=page.getByRole('link', {name:'Logout'});
    }

    //Verifies if my account page is displayed
    //@returns Promise<boolean> -----> Returns true if heading is visible

    async isMyAccountPageExists(): Promise<boolean>{
        try{
            const isVisible=await this.msgHeading.isVisible();
            return isVisible;
        }catch(error){
            console.log(`Error Checking My Account Page Heading Visibility: ${error}`);
            return false;
        }
    }

    //clicks on the Logout link 
    // @returns Promise<LogoutPage> --------> Returns the instance of the LogoutPage

    async clickLogout(): Promise<LogoutPage>{
        try{
            await this.lnkLogout.click();
            return new LogoutPage(this.page);
        }catch(error){
            console.log(`Unable to click logout link: ${error}`);
            throw error;
        }
    }

    //Alternative method to return page Exists using title
    // @returns Promise<boolean> ------> returns true if page title matches

    async getPageTitle(): Promise<string>{
        return (this.page.title());
    }
}