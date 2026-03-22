/*
Test case: - Product Search

Tag: @master, @regression

Steps:
1) Navigate to the Application URL
2) Enter the Product name in the search field
3) Click the Search button
4) Verify if the product is displayed in the search results
*/

import {test, expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultPage';
import { TestConfig } from '../test.config';

//Decalre Reusable Variables

let config: TestConfig;
let HomePage: Homepage;
let searchResultPage: SearchResultsPage;

//Playwright Hook - Runs Before Each test

test.beforeEach(async ({page})=>{
    config=new TestConfig();        //Load Configuration values like URL and Product Name
    await page.goto(config.appUrl);     //Step 1: Navigate to the Application

    //Initialize page objects
    HomePage=new Homepage(page);
    searchResultPage=new SearchResultsPage(page);

});

//Playwright Hook- Runs after each test (Optional Cleanup)
test.afterEach(async({page})=>{
    await page.close();        //Closes the browser tab after test
})

test("Product Search test @master @regression", async()=>{
    const productName=config.productName;

    //Step 2 & 3 : Enter Product Name and click Search
    await HomePage.enterProductName(productName);
    await HomePage.clickSearch();

    //Step 4: Verify that the Search Results page is displayed
    expect(await searchResultPage.isSearchResultsPageExists()).toBeTruthy();

    //Step 5: Validate if the searched Product Appears in results
    const isProductFound=await searchResultPage.isProductExists(productName);
    expect(isProductFound).toBeTruthy();
})