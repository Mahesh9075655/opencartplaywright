import {Page, Locator} from '@playwright/test';

export class LoginPage{

    private readonly page: Page;

    //Locaotrs
    private readonly txtEmailAddress: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly txtErrorMessage: Locator;

    constructor(page: Page){

        this.page=page;

        //Intialize Locators With CSS Selectors
        this.txtEmailAddress=page.locator("#input-email");
        this.txtPassword=page.locator("#input-password");
        this.btnLogin=page.locator("input[value='Login']");
        this.txtErrorMessage=page.locator(".alert.alert-danger.alert-dismissible");
    }

    //Set the Email Address in the email field

    async setEmail(email:string){
        await this.txtEmailAddress.fill(email);
    }

    //Set the Password in the Password Field

    async setPassword(pwd:string){
        await this.txtPassword.fill(pwd);
    }

    //Clicks the Login button
    async clickLogin(){
        await this.btnLogin.click();
    }

    //Performs the Complete Login
    async login(email:string, password:string){
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLogin();
    }

    async getLoginErrorMessage():Promise<null | string>{
        return (this.txtErrorMessage.textContent());
    }
}