/**
 * Cloudflare Worker — SPA routing handler
 * Serves index.html for all routes that don't match a static asset
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try to serve the static asset first
    try {
      const asset = await env.ASSETS.fetch(request);
      // If it's a real file (not a 404), return it
      if (asset.status !== 404) return asset;
    } catch (_) {}

    // For all other routes (SPA navigation), serve index.html
    const indexRequest = new Request(new URL('/', url).toString(), request);
    return env.ASSETS.fetch(indexRequest);
  },
};
