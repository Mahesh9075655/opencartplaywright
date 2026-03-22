import {Page, Locator, expect} from '@playwright/test';
import {ShoppingCartPage} from './ShoppingCartPage' //Import ShoppingCartpage if needed

export class ProductPage{
    private readonly page: Page;

    //Locators using css Selector
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;

    constructor(page: Page){
        this.page=page;

        //Initialize Locators Woth CSS Selectors
        this.txtQuantity=page.locator("input[name='quantity']");
        this.btnAddToCart=page.locator("button#button-cart");
        this.cnfMsg=page.locator(".alert.alert-success.alert-dismissible");
        this.btnItems=page.locator("#cart");
        this.lnkViewCart=page.locator("strong:has-text(' View Cart')");
    }

    //Sets the Product Quantity
    // @param qty- Quantity to set

    async setQuantity(qty:string): Promise<void>{
        await this.txtQuantity.fill('');
        await this.txtQuantity.fill(qty);
    }

    //Add Product to Cart
    async addToCart(): Promise<void>{
        await this.btnAddToCart.click();
    }

    //Check if confirmation message is visible
    //@returns Promise<boolean> -returns true if message is visible

    async isConfirmationMessageVisible(): Promise<boolean>{
        try{
            if(this.cnfMsg!=null){
                  return true;
            }
            else{
                return false;
            }
        }catch(error){
            console.log(`Confirmation Message not found: ${error}`);
            return false;
        }
    }

    //Click on itmes buttons to navigate to the cart page
    async clickCartButtoon(): Promise<void>{
        await this.btnItems.click();
    }

    //Click on the View Cart Link
    async clickViewCartLink(): Promise<ShoppingCartPage>{
        await this.lnkViewCart.click();
        return new ShoppingCartPage(this.page);
    }



}
