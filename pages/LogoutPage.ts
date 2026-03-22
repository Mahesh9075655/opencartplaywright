import{Page, Locator} from '@playwright/test';
import { Homepage } from './HomePage';

export class LogoutPage{

    private readonly page: Page;
    private readonly btnContinue: Locator;

    constructor(page: Page){
        this.page=page;
        this.btnContinue=page.locator(".btn.btn-primary");
    }

    //Clicks the continue button after logout 
    //@returns Promise<HomePage> ------->Retunrs instance of Homepage

    async clickContinue(): Promise<Homepage>{
        await this.btnContinue.click();
        return new Homepage(this.page);
    }

    //Verifies if the continue button is visible 
    //@retuns Promise<boolean> ----------> Returns true if button is visible
    async isContinueButtonIsVisible(): Promise<boolean>{
        return await this.btnContinue.isVisible();
    }
}