import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  adminEmail: process.env.ADMIN_EMAIL ?? '',
  adminPassword: process.env.ADMIN_PASSWORD ?? '',
  baseURL: process.env.BASE_URL ?? 'https://admin-demo.nopcommerce.com',
};