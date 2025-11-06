import { defineStore } from "pinia";
import type { AuthUser, LoginRequest } from "~/models/auth.models";
import { loginService, getProfileService, logoutService } from "~/services/auth.services";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null as AuthUser | null,
		loading: false,
	}),

	getters: {
		isAuthenticated: (state) => !!state.user,
	},

	actions: {
		async login(payload: LoginRequest) {
			this.loading = true;
			try {
				const res = await loginService(payload);
				this.user = res.user;
				return res;
			} finally {
				this.loading = false;
			}
		},

		async getAuth() {
			try {
				const res = await getProfileService();
				this.user = res;
			} catch {
				this.user = null;
			}
		},

		async logout() {
			await logoutService();
			this.user = null;
		},
	},
});
