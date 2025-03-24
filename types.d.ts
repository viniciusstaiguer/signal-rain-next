declare module "http-proxy-middleware" {
  import type { IncomingMessage, ServerResponse } from "http"

  type ProxyResCallback = (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse) => void

  interface Options {
    target: string
    changeOrigin?: boolean
    onProxyRes?: ProxyResCallback
  }

  function createProxyMiddleware(
    options: Options,
  ): (req: IncomingMessage, res: ServerResponse, next: () => void) => void
}

