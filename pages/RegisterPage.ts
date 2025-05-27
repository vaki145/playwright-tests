import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async register(username: string, email: string, password: string) {
    const homepage = await this.page.getByRole('heading', { name: 'AutomationExercise' }).isVisible();
        console.log('Homepage is visible successfully', homepage);
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    const signupForm = await this.page.getByRole('heading', { name: 'New User Signup!' }).isVisible();
        console.log('"New User Signup!" is visible', signupForm);
    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Email Address' }).nth(1).click();
    await this.page.getByRole('textbox', { name: 'Email Address' }).nth(1).fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
    const infoForm = await this.page.getByText('Enter Account Information').isVisible();
        console.log('"ENTER ACCOUNT INFORMATION" is visible', infoForm);
    await this.page.getByRole('radio', { name: 'Mrs.' }).check();
    await this.page.getByRole('textbox', { name: 'Password *' }).click();
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);
    await this.page.locator('#days').selectOption('2');
    await this.page.locator('#months').selectOption('2');
    await this.page.locator('#years').selectOption('2000');
    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    await this.page.getByRole('textbox', { name: 'First name *' }).click();
    await this.page.getByRole('textbox', { name: 'First name *' }).fill('test');
    await this.page.getByRole('textbox', { name: 'Last name *' }).click();
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill('playwright');
    await this.page.getByRole('textbox', { name: 'Company', exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill('abc');
    await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
    await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('12 Le Loi');
    await this.page.getByRole('textbox', { name: 'Address 2' }).click();
    await this.page.getByRole('textbox', { name: 'Address 2' }).fill('20 Dong Da');
    await this.page.getByLabel('Country *').selectOption('New Zealand');
    await this.page.getByRole('textbox', { name: 'State *' }).click();
    await this.page.getByRole('textbox', { name: 'State *' }).fill('xyz');
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('asd');
    await this.page.locator('#zipcode').click();
    await this.page.locator('#zipcode').fill('30000');
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).click();
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill('012345678');
    await this.page.getByRole('button', { name: 'Create Account' }).click();
    const successNoti = await this.page.getByText('Account Created!').isVisible();
        console.log('"ACCOUNT CREATED!" is visible', successNoti);
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
