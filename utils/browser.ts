import { chromium as playwrightChromium } from 'playwright-extra';
import StealthPlugin from 'playwright-extra-plugin-stealth';

// Apply stealth plugin to bypass Cloudflare bot detection
playwrightChromium.use(StealthPlugin());

export { playwrightChromium as chromium };