/*

Test case:- End to End Test on Demo E-Commerse Application

Purpose:
This Test Simulates a complete user flow on an e-commerse site

Steps:
1) Register a new account
2) Logout after registration
3) Login with the same account
4) Search for as product and add it to the shopping cart
5) Verify Cart contents
6) Attempt checkout (Disabled since Feature isn't available on demo site)

*/

import {test, expect, Page} from '@playwright/test';
import {RegistrationPage} from '../pages/RegistrationPage';
import{Homepage} from '../pages/HomePage';
import {RandomDataUtil} from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';
import { LogoutPage } from '../pages/LogoutPage';
import {LoginPage} from '../pages/LoginPage';
import {MyAccountPage} from '../pages/MyAccountPage';
import { SearchResultsPage } from '../pages/SearchResultPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';


//This is the main test Block That Runs the entire flow

test("Execute end-to-end test flow @end-to-end", async({page})=>{
    const config=new TestConfig();

    //Navigate to the Application Home Page
    await page.goto(config.appUrl);

    //Step 1: Register a new Account and capture the genrated email
    let registeredEmail:string=await performRegistration(page);
    console.log("✅ Registration is Completed");

    //Step 2: Logout after succesfull registration
    await performLogout(page);
    console.log("✅ Logout is Completed");

    //Step 3: Login with registered email
    await performLogin(page, registeredEmail);
    console.log("✅ Login is Completed");

    //Step 4: Search for a product and add it to the cart
    await addProductToCart(page);
    console.log("✅ Product added to cart");

    //Verify the Contents of the Shopping cart
    await verifyShoppingCart(page);
    console.log("✅ Shopping cart verification completed");

    //Step 6: Perform Checkout (Skipped for demo site)
    // await performCheckout(page);

})

//Fucntion to register a new user account

async function performRegistration(page:Page): Promise<string> {

    const HomePage=new Homepage(page);
    await HomePage.clickMyAccount();       //Click My Account Link
    await HomePage.clikcRegister();       // Click "Register" Option
    const registrationPage=new RegistrationPage(page);

    //Fill in Random user details
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());

    let email:string=RandomDataUtil.getEmail();
    await registrationPage.setEmail(email);

    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    await registrationPage.setPassword("test@123");
    await registrationPage.setConfirmPassword("test@123");

    await registrationPage.setPrivacyPolicy(); //Accet the Privacy Policy
    await registrationPage.clickContinueButton(); //Submit the registration form

    //Validate that the Registration was Succesfull
    const confirmationMsg=await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    return email;
    
}

//Function to Logout the current user
async function performLogout(page:Page) {
    const myAccountPage=new MyAccountPage(page);
    const logoutPage:LogoutPage=await myAccountPage.clickLogout();

    //Ensure the Continue button is visible
    expect(await logoutPage.isContinueButtonIsVisible()).toBe(true);

    //Click Contine and Verify redirection to HomePage
    const HomePage:Homepage=await logoutPage.clickContinue();
    expect(await HomePage.isHomePageExists()).toBe(true);
    
}

//Function to Logi in using the registered email
async function performLogin(page:Page, email:string) {
    const config=new TestConfig();
    await page.goto(config.appUrl); //Reload Home Page

    const HomePage=new Homepage(page);
    await HomePage.clickMyAccount();       //Click My Account Link
    await HomePage.clickLogin();       // Click "Login" Option

    const loginPage=new LoginPage(page);
    await loginPage.login(email, "test@123"); //Use the registered credentials

    //Veriify login by checking my account page
    const myAccountPage=new MyAccountPage(page);
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
   
}

//Function to Search a  product and add it to a cart
async function addProductToCart(page:Page) {

    const homePage=new Homepage(page);
    const config=new TestConfig();   
    const productName=config.productName;
    const productQuantity=config.productQuantity;

    await homePage.enterProductName(productName);
    await homePage.clickSearch();  //Click On search button

    const searchResultPage=new SearchResultsPage(page);

    //Validate search results page
    expect(await searchResultPage.isSearchResultsPageExists()).toBeTruthy();

    //Validate That the desired product exists in the results
    expect(await searchResultPage.isProductExists(productName)).toBeTruthy();

    //Select the Product and set the Quantity
    const productPage=await searchResultPage.selectProduct(productName);
    await productPage?.setQuantity(productQuantity);
    await productPage?.addToCart(); //Add Product to shopping cart

    await page.waitForTimeout(3000);

    //Confirm Product was added
    expect(await productPage?.isConfirmationMessageVisible()).toBeTruthy();
}


//Function to verify the Shopping Cart details
async function verifyShoppingCart(page:Page) {

    const productPage=new ProductPage(page);

    //Naviate to the Shopping cart from Product page
    await productPage.clickCartButtoon();

    const shoppingCartPage=await productPage.clickViewCartLink();

    console.log("🛍️ Navigate to Shopping cart");

    const config=new TestConfig();

    //Validate the total price is correct 
    expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);


    
}

