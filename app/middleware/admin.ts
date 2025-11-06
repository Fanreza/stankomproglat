import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
	const auth = useAuthStore();

	// Pastikan user sudah login
	if (!auth.user) {
		await auth.getAuth();
	}

	if (!auth.user) {
		return navigateTo("/admin/login");
	}
});
