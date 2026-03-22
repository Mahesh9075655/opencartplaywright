import{Page, expect, Locator} from '@playwright/test'
import { exec } from 'node:child_process';

export class Homepage{

    //Locators
    private readonly page: Page;
    private readonly linkMyAccount: Locator;
    private readonly linkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly textSearchBox: Locator;
    private readonly btnSearch: Locator;

    //Constructors
    constructor(page: Page)
    {
        this.page=page;
        this.linkMyAccount=page.locator("//span[text()='My Account']");
        this.linkRegister=page.locator("a:has-text('Register')");
        this.linkLogin=page.locator("//a[text()='Login']");
        this.textSearchBox=page.locator("input[name='search']");
        this.btnSearch=page.locator("#search button[type='button']")
        
    }

    //Action Methods

    //Check if Home page Exists
    async isHomePageExists()
    {
        let title:string=await this.page.title();
        if(title)
        {
            return true;
        }
        return false;

    }

    //click "My Account" Link
    async clickMyAccount()
    {
        try{
            await this.linkMyAccount.click();
        }catch(error){
            console.log(`Exception Occured While Clicking 'My Account': ${error}`);
            throw error;
        }
        
    }

    //Click "Register" Link
    async clikcRegister(){
        try{
            await this.linkRegister.click();
        }catch(error){
            console.log(`Exception Occured While Clicking 'Register': ${error}`);
            throw error;
        } 
    }

    //Click Login Link
    async clickLogin()
    {
        try{
            await this.linkLogin.click();
        }catch(error){
            console.log(`Exception Occured While Clicking 'Login': ${error}`);
            throw error;
        }
    }

    //Enter the Product name in the Search Bar
    async enterProductName(pName:string)
    {
        try{
            await this.textSearchBox.fill(pName);
        }catch(error){
            console.log(`Exception Occured While Entering Product Name: ${error}`);
        }
    }

    //Click the Search Button
    async clickSearch(){
        try{
            await this.btnSearch.click();
        }catch(error){
            console.log(`Exception Occured While Clicking the Search Button: ${error}`);
            throw error;
        }
    }

}
        