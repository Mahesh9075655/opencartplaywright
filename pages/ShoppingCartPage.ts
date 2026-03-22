import {Page, Locator} from '@playwright/test';
import {CheckoutPage} from './CheckoutPage'; //Import CheckoutPage if needed

export class ShoppingCartPage{
    private readonly page:Page;

    //Locators using CSS Selectors
    private readonly lblTotalPrice: Locator;
    private readonly btnCheckout: Locator;

    constructor(page:Page){
        this.page=page;

        //Initialize Locators with css selectors
        this.lblTotalPrice=page.locator("//strong[text()='Total:']//following::td");
        this.btnCheckout=page.locator("a.btn.btn-primary");
    }

    //Get the Total Price from the Shopping cart
    //Returns Promise<string |null> ---->The total price text

    async getTotalPrice():Promise<string | null>{
        try{
             return await this.lblTotalPrice.textContent();
        }catch(error){
            console.log(`Unable to retrive the total Price: ${error}`);
            return null;
        }
    }

    //click on the checkout button
    //@returns Promise<CheckoutPage> ------> CheckoutPage instance

    async clickOnCheckout():Promise<CheckoutPage>{
        await this.btnCheckout.click();
        return new CheckoutPage(this.page);
    }


    //Verify if shopping cart page is loaded
    //loaded Promise<boolean> ----> true if page is loaded

    async isPageLoaded(): Promise<boolean>{
        try{
            return await this.btnCheckout.isVisible();
        }
        catch(error){
            return false;
        }
    }


}