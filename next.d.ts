declare module '@vercel/next' {
    export function createNext(options: { dev: boolean; conf: { distDir: string } }): any;
  }