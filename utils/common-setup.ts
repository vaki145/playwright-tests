import { Page } from '@playwright/test';

export async function Register(page: Page, username: string, email: string, password: string) {
    await page.goto('https://www.automationexercise.com');
    const homepage = await page.getByRole('heading', { name: 'AutomationExercise' }).isVisible();
        console.log('Homepage is visible successfully', homepage);
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    const signupForm = await page.getByRole('heading', { name: 'New User Signup!' }).isVisible();
        console.log('"New User Signup!" is visible', signupForm);
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill(username);
    await page.getByRole('textbox', { name: 'Email Address' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Email Address' }).nth(1).fill(email);
    await page.getByRole('button', { name: 'Signup' }).click();
    const infoForm = await page.getByText('Enter Account Information').isVisible();
        console.log('"ENTER ACCOUNT INFORMATION" is visible', infoForm);
    await page.getByRole('radio', { name: 'Mrs.' }).check();
    await page.getByRole('textbox', { name: 'Password *' }).click();
    await page.getByRole('textbox', { name: 'Password *' }).fill(password);
    await page.locator('#days').selectOption('2');
    await page.locator('#months').selectOption('2');
    await page.locator('#years').selectOption('2000');
    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    await page.getByRole('textbox', { name: 'First name *' }).click();
    await page.getByRole('textbox', { name: 'First name *' }).fill('test');
    await page.getByRole('textbox', { name: 'Last name *' }).click();
    await page.getByRole('textbox', { name: 'Last name *' }).fill('playwright');
    await page.getByRole('textbox', { name: 'Company', exact: true }).click();
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('abc');
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('12 Le Loi');
    await page.getByRole('textbox', { name: 'Address 2' }).click();
    await page.getByRole('textbox', { name: 'Address 2' }).fill('20 Dong Da');
    await page.getByLabel('Country *').selectOption('New Zealand');
    await page.getByRole('textbox', { name: 'State *' }).click();
    await page.getByRole('textbox', { name: 'State *' }).fill('xyz');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('asd');
    await page.locator('#zipcode').click();
    await page.locator('#zipcode').fill('30000');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('012345678');
    await page.getByRole('button', { name: 'Create Account' }).click();
    const successNoti = await page.getByText('Account Created!').isVisible();
        console.log('"ACCOUNT CREATED!" is visible', successNoti);
    await page.getByRole('link', { name: 'Continue' }).click();
}

export async function Login(page: Page, email: string, password: string) {
    await page.goto('https://www.automationexercise.com');
    const homepage = await page.getByRole('heading', { name: 'AutomationExercise' }).isVisible();
        console.log('Homepage is visible:', homepage);
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    const loginForm = await page.getByRole('heading', { name: 'Login to your account' }).isVisible();
        console.log('"Login to your account" is visible', loginForm);
    await page.getByRole('textbox', { name: 'Email Address' }).nth(0).click();
    await page.getByRole('textbox', { name: 'Email Address' }).nth(0).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
}
