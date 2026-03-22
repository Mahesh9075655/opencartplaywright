/*

Test case:- Add Product to Cart

Tags: @master, @regression

Steps: 
1. Navigate to the Application URL
2. Enter an existing product name in the search box
3. Click the search button
4. Verify the Product appearch in the search results
5. Select the Product
6. Set Quantity
7. Add the Product to the cart
8. Verify the Success message

*/

import{test, expect} from '@playwright/test';
import{ TestConfig } from '../test.config';
import {Homepage} from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultPage';
import { ProductPage } from '../pages/ProductPage';

//Shared intances

let config: TestConfig;
let HomePage: Homepage;
let searchResultPage: SearchResultsPage;
let productPage: ProductPage;

test.beforeEach(async ({page})=>{
    config=new TestConfig();        //Load test configuration
    await page.goto(config.appUrl);

    //Initialize the Objects

    HomePage=new Homepage(page);
    searchResultPage=new SearchResultsPage(page);
    productPage=new ProductPage(page);
})

test("Add Product to cart test @master @regression", async({page})=>{

    //Enter Product Name in the Search Box
    await HomePage.enterProductName(config.productName);

    //Click the Search Button
    await HomePage.clickSearch();

    //Verify the Search Result Page is Displayed
    expect(await searchResultPage.isSearchResultsPageExists()).toBeTruthy();

    //Verify the Product Exists in the results
    const productName=config.productName;
    expect(await searchResultPage.isProductExists(productName)).toBeTruthy();

    //Select Product--->Set Quantity--->Add to cart--->Verify Confirmation
    if(await searchResultPage.isProductExists(productName)){
        await searchResultPage.selectProduct(productName);

        await productPage.setQuantity(config.productQuantity);   //set Quantity
        await productPage.addToCart();

        //assert Success message is visible
        expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
    }
    
})
