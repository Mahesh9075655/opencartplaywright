//import { he } from '@faker-js/faker';
import {Page, Locator} from '@playwright/test';
import {ProductPage} from './ProductPage';   //Import Product page if needed

export class SearchResultsPage {
    private readonly page: Page;

    //Locators using Css Selector
    private readonly searchProductHeader: Locator;
    private readonly searchProducts: Locator;

    constructor(page: Page){
        this.page=page;

        //Initialize Locators with CSS Selector
        this.searchProductHeader=page.locator("#content h1");
        this.searchProducts=page.locator("h4>a");
    }

    //Verify if the search results page exists by checking the header text
    // @returns Promise<boolean> ------> true if the search results page exists

    async isSearchResultsPageExists(): Promise<boolean> {
        try{
            const headerText = await this.searchProductHeader.textContent();
            return headerText?.includes("Search -") ?? false;
        }catch(error){
            return false;
        }
    }

    //Check if a Product Exists in the Search results by its name
    // @param productName - The Name of the product to search for
    // @returns Promise<boolean> ---> true if the Product Exists

    async isProductExists(productName:string): Promise<boolean>{
        try{
            const count=await this.searchProducts.count();
            for(let i=0; i<count; i++){
                const products=this.searchProducts.nth(i);
                const title=await products.textContent();
                if(title===productName){
                    return true;
                }  
            }
            }catch (error){
                console.log(`Error checking product existence: ${error}`);
            }
            return false;
       
    }

    //Select a Product From the Search results by its name
    //@param productName- The Name of the Product to select
    //@returns Promise<ProductPage> -------> ProductPage instance after selecting the product

    async selectProduct(productName:string): Promise<ProductPage | null> {
        try{
            const count=await this.searchProducts.count();
            for(let i=0; i<count; i++){
                const product=await this.searchProducts.nth(i);
                const title=await product.textContent();
                if(title===productName){
                    await product.click();
                    return new ProductPage(this.page);
                }
            }
            console.log(`Producct not found: ${productName}`);
        }catch(error){
            console.log(`Error Selecting Product: ${error}`);
        }
        return null;

    }


    //Get Count of products in search results
    //@returns Promise<number> -------> Number of Products Found

    async getProductCount(): Promise<number>{
        return await this.searchProducts.count();
    }
}