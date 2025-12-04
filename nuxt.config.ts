import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devServer: { port: parseInt(process.env.NUXT_PORT || "5173") },
	devtools: { enabled: true },

	ssr: true,
	routeRules: {
		"/admin/**": { ssr: false },
	},

	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_API_URL,
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
				// --------------------------
				//  FIX API KAMU DIBLOK
				// --------------------------
				"connect-src": ["'self'", "https://stankom.fanreza.my.id", "https://apistankom.kemnaker.go.id", "https://apisiapvokasi.kemnaker.go.id", "https://www.instagram.com", "https://platform.twitter.com"],

				// --------------------------
				//  FIX GAMBAR API + IG
				// --------------------------
				"img-src": ["'self'", "data:", "https://stankom.fanreza.my.id", "https://apistankom.kemnaker.go.id", "https://apisiapvokasi.kemnaker.go.id", "https://storage.googleapis.com", "https://scontent.cdninstagram.com", "https://*.cdninstagram.com", "https://*.fbcdn.net"],

				// --------------------------
				//  FIX INSTAGRAM + TWITTER SCRIPTS
				// --------------------------
				"script-src": [
					"'self'",
					"'unsafe-inline'",
					"https://www.instagram.com",
					"https://static.cdninstagram.com",
					"https://platform.twitter.com", // <--- FIX TWITTER
				],

				// --------------------------
				//  FIX CSS INSTAGRAM
				// --------------------------
				"style-src": ["'self'", "'unsafe-inline'", "https://www.instagram.com", "https://static.cdninstagram.com"],

				// --------------------------
				//  FIX iframe Instagram + Google
				// --------------------------
				"frame-src": [
					"'self'",
					"https://www.instagram.com",
					"https://www.google.com", // <--- FIX GOOGLE MAPS / SEARCH RESULT
					"https://platform.twitter.com", // <--- Twitter embed iframe
				],
			},
		},
	},
});
