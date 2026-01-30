import { Router } from 'itty-router'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

const router = Router()

// Serve static assets
router.get('*', async (request, env, ctx) => {
  try {
    return await getAssetFromKV(
      { request, waitUntil: ctx.waitUntil.bind(ctx) },
      { cacheControl: { browserTTL: 3600 } }
    )
  } catch (err) {
    return new Response('Not Found', { status: 404 })
  }
})

export default router