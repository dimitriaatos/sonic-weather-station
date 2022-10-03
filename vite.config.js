import * as dotenv from 'dotenv'
dotenv.config()
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { port } from './common/constants'

export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: process.env.PORT || 5173,
		proxy: {
			'/api': {
				target: `http://localhost:${process.env.SERVER_PORT || port}`,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
})
