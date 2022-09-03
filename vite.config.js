import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { port } from './common'

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: `http://localhost:${port}`,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
})
