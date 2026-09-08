import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'

import chatApi from './api/chat.ts'

function localChatApi(): Plugin {
  return {
    name: 'local-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (request, response, next) => {
        try {
          const chunks: Buffer[] = []

          for await (const chunk of request) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
          }

          const headers = new Headers()

          for (const [name, value] of Object.entries(request.headers)) {
            if (value) {
              headers.set(name, Array.isArray(value) ? value.join(',') : value)
            }
          }

          const method = request.method ?? 'GET'
          const webRequest = new Request(
            new URL(
              '/api/chat',
              `http://${request.headers.host ?? 'localhost'}`,
            ),
            {
              method,
              headers,
              body:
                method === 'GET' || method === 'HEAD'
                  ? undefined
                  : Buffer.concat(chunks).toString('utf8'),
            },
          )
          const webResponse = await chatApi.fetch(webRequest)

          response.statusCode = webResponse.status
          webResponse.headers.forEach((value, name) => {
            response.setHeader(name, value)
          })
          response.end(Buffer.from(await webResponse.arrayBuffer()))
        } catch (error) {
          next(error as Error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  if (env.GROQ_API_KEY && !process.env.GROQ_API_KEY) {
    process.env.GROQ_API_KEY = env.GROQ_API_KEY
  }

  if (env.GROQ_MODEL && !process.env.GROQ_MODEL) {
    process.env.GROQ_MODEL = env.GROQ_MODEL
  }

  if (env.PORTFOLIO_PROFILE_CONTEXT && !process.env.PORTFOLIO_PROFILE_CONTEXT) {
    process.env.PORTFOLIO_PROFILE_CONTEXT = env.PORTFOLIO_PROFILE_CONTEXT
  }

  return {
    plugins: [react(), localChatApi()],
  }
})
