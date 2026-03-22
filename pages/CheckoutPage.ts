import {Page,expect,Locator} from '@playwright/test';

export class CheckoutPage{

    private readonly page:Page;
    private readonly checkoutMsg: Locator;

    constructor(page: Page){
        this.page=page;

        this.checkoutMsg=page.locator("//h1[text()='Checkout']");
    }
}

