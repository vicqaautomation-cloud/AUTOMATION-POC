import { BasePage } from './BasePage';

// Interface que define las credenciales de login
export interface Credentials {
  email: string;
  password: string;
}

export class LoginPage extends BasePage {

  private emailInput = this.page.locator('#Email');
  private passwordInput = this.page.locator('#Password');
  private submitButton = this.page.locator('button.login-button');

  async navigate(): Promise<void> {
    await super.navigate('/login');
  }

  async login(credentials: Credentials): Promise<void> {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    await this.submitButton.click();
  }
}