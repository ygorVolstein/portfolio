import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base:
//  - dev                -> '/'
//  - build na Vercel    -> '/'        (site servido na raiz)
//  - build local/GH Pages -> '/portfolio/'
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' && !process.env.VERCEL ? '/portfolio/' : '/',
}))
