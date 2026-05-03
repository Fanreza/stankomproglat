import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devServer: { port: parseInt(process.env.NUXT_PORT || "5173") },
	devtools: { enabled: true },

	ssr: true,
	routeRules: {
		"/admin/**": { ssr: false },
		"/api/v1/**": {
			proxy: "http://192.168.223.21:4002/api/v1/**",
		},

		"/uploads/**": {
			proxy: "http://192.168.223.21:4002/uploads/**",
		},
	},

	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_PUBLIC_API_BASE,
		},
	},

	modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "shadcn-nuxt", "@vueuse/nuxt", "nuxt-svgo", "@pinia/nuxt", "nuxt-security"],

	css: ["~/assets/css/tailwind.css"],
	vite: {
		plugins: [tailwindcss()],
	},

	icon: {
		mode: "css",
		cssLayer: "base",
	},

	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./app/components/ui"
		 */
		componentDir: "./app/components/ui",
	},

	fonts: {
		defaults: {
			weights: [400, 500, 600, 700, 800, 900],
		},
	},

	security: {
		sri: false,
		ssg: {
			hashScripts: false,
		},

		headers: {
			contentSecurityPolicy: {
				"default-src": ["'self'"],
				"worker-src": ["'self'", "blob:"],
				"child-src": ["'self'", "blob:"],

				"connect-src": ["'self'", "https://192.168.223.21:4002", "http://192.168.223.21:4002", "https://www.instagram.com", "https://i.instagram.com", "https://graph.instagram.com", "https://platform.twitter.com", "https://maps.googleapis.com"],

				"img-src": ["'self'", "data:", "blob:", "https://192.168.223.21:4002", "http://192.168.223.21:4002", "https://storage.googleapis.com", "https://scontent.cdninstagram.com", "https://*.cdninstagram.com", "https://*.fbcdn.net", "https://maps.gstatic.com", "https://lh3.googleusercontent.com", "https://api.iconify.design"],

				"script-src": [
					"'self'",
					"'unsafe-inline'",
					"'unsafe-eval'", // Instagram embed butuh eval
					"https://www.instagram.com",
					"https://static.cdninstagram.com",
					"https://platform.instagram.com",
					"https://platform.twitter.com",
					"https://www.google.com",
					"https://maps.googleapis.com",
					"https://maps.gstatic.com",
				],

				"style-src": ["'self'", "'unsafe-inline'", "https://www.instagram.com", "https://static.cdninstagram.com"],

				"frame-src": ["'self'", "https://www.instagram.com", "https://instagram.com", "https://platform.twitter.com", "https://www.google.com", "https://maps.googleapis.com", "https://maps.gstatic.com", "https://www.youtube.com", "https://*.instagram.com"],
			},

			// PENTING: Ubah ini
			crossOriginEmbedderPolicy: "unsafe-none", // atau "unsafe-none"
			crossOriginResourcePolicy: "cross-origin", // atau "cross-origin"
			crossOriginOpenerPolicy: "unsafe-none", // atau "unsafe-none"
		},
	},
});
