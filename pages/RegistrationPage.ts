import{Page, Expect, Locator} from '@playwright/test'

export class RegistrationPage{

    private readonly page:Page;

    //Locator using CSS Selector
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly checkPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;

    constructor(page: Page){

        this.page=page;
        //Initialize Locators with CSS Selectors
        this.txtFirstName= page.locator("#input-firstname");
        this.txtLastName=page.locator("#input-lastname");
        this.txtEmail=page.locator("#input-email");
        this.txtTelephone=page.locator("#input-telephone");
        this.txtPassword=page.locator("#input-password");
        this.txtConfirmPassword=page.locator("#input-confirm");
        this.checkPolicy=page.locator("input[name='agree']");
        this.btnContinue=page.locator("input[value='Continue']");
        this.msgConfirmation=page.locator("h1:has-text('n')");
    }

    //Set the First Name in the Registration Form

    async setFirstName(fname:string):Promise<void>{
        await this.txtFirstName.fill(fname);
    }

    //Set the Lasr Name in the Registration Form

    async setLastName(lname:string):Promise<void>{
        await this.txtLastName.fill(lname);
    }

    //Set the Email in the Registration form

    async setEmail(email:string):Promise<void>{
        await this.txtEmail.fill(email);
    }

    //Set the Telephone Number in the Registration Form

    async setTelephone(tel:string):Promise<void>{
        await this.txtTelephone.fill(tel);
    }

    //Set the password in the registration form

    async setPassword(pwd:string):Promise<void>{
        await this.txtPassword.fill(pwd);
    }

    //Set the Confirm Password in the registration form

    async setConfirmPassword(cpwd:string):Promise<void>{
        await this.txtConfirmPassword.fill(cpwd);
    }

    //Check the Privacy Policy Checkbox

    async setPrivacyPolicy():Promise<void>{
        await this.checkPolicy.check();
    }

    //Click the Continue Button

    async clickContinueButton():Promise<void>{
        await this.btnContinue.click();
    }

    //Get the Confirmation Message

    async getConfirmationMsg():Promise<string>{
        return await this.msgConfirmation.textContent() ?? '';
    }

    async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
    }): Promise<void> {
        await this.setFirstName(userData.firstName);
        await this.setLastName(userData.lastName);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.telephone);
        await this.setPassword(userData.password);
        await this.setConfirmPassword(userData.password);
        await this.setPrivacyPolicy();
        await this.clickContinueButton();
        await this.getConfirmationMsg();
    }
}
