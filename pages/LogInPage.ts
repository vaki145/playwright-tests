import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    const homepage = await this.page.getByRole('heading', { name: 'AutomationExercise' }).isVisible();
    console.log('Homepage is visible:', homepage);

    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    const loginForm = await this.page.getByRole('heading', { name: 'Login to your account' }).isVisible();
    console.log('"Login to your account" is visible', loginForm);
    
    await this.page.getByRole('textbox', { name: 'Email Address' }).nth(0).click();
    await this.page.getByRole('textbox', { name: 'Email Address' }).nth(0).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
