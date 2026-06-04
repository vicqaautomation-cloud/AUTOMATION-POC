import { Page } from '@playwright/test';

// Interface que define la estructura de navegación de cualquier página
export interface PageOptions {
  path: string;
}

export class BasePage {
  constructor(protected page: Page) {}

  // Método base de navegación — todas las pages lo heredan
  // Usa ruta relativa, baseURL viene de playwright.config.ts
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  // Espera a que la página esté completamente cargada
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // Obtiene el título de la página — útil para assertions
  async getTitle(): Promise<string> {
    return this.page.title();
  }
}