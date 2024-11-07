// src/index.ts
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

declare const STATIC_CONTENT: KVNamespace;
declare const __STATIC_CONTENT_MANIFEST: string;

export interface Env {
  STATIC_CONTENT: KVNamespace;
  NEXT_PUBLIC_SERVER_URL: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      const manifest = JSON.parse(__STATIC_CONTENT_MANIFEST || '{}');

      console.log(`Fetching URL: ${request.url}`);

      // Serve static assets
      if (request.url.includes('/static/') || request.url.includes('/_next/')) {
        try {
          const assetResponse = await getAssetFromKV(
            {
              request,
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
              ASSET_MANIFEST: manifest,
              ASSET_NAMESPACE: env.STATIC_CONTENT,
              cacheControl: {
                browserTTL: 60 * 60 * 24 * 365, // 1 year
                edgeTTL: 60 * 60 * 24 * 365, // 1 year
              },
            }
          );
          console.log('Asset served successfully')
          return assetResponse;
        } catch (err) {
          console.error('Asset serving error:', err);
          return new Response('Error serving static assets', { status: 500 });
        }
      }

      // Handle dynamic routes
      const url = new URL(request.url);
      const response = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}${url.pathname}${url.search}`, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });

      if (!response.ok) {
        console.error(`Fetch error: ${response.statusText}`, { status: response.status });
        return new Response('Error fetching from backend', { status: response.status });
      }

      return response;
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};