import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async () => {
	const auth = useAuthStore();

	if (!auth.user) {
		await auth.getAuth();
	}

	if (auth.user) {
		return navigateTo("/admin");
	}
});
