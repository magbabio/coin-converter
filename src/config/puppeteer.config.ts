import { LaunchOptions } from 'puppeteer';

export const puppeteerConfig: LaunchOptions = {
  headless: true, // true para no abrir ventana del navegador
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  defaultViewport: {
    width: 1280,
    height: 800,
  },
};
