declare module '*.css';

declare module 'puppeteer' {
  type WaitUntil = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

  export type ScreenshotOptions = {
    type?: 'png' | 'jpeg' | 'webp';
    fullPage?: boolean;
  };

  export type Page = {
    setViewport(viewport: { width: number; height: number }): Promise<void>;
    goto(url: string, options?: { waitUntil?: WaitUntil; timeout?: number }): Promise<unknown>;
    screenshot(options?: ScreenshotOptions): Promise<Buffer | Uint8Array>;
  };

  export type Browser = {
    newPage(): Promise<Page>;
    close(): Promise<void>;
  };

  const puppeteer: {
    launch(options?: { headless?: boolean; args?: string[] }): Promise<Browser>;
  };

  export default puppeteer;
}
