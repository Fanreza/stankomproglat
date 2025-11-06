import type { LoginRequest, LoginResponse, ProfileResponse } from "~/models/auth.models";

export const loginService = async (payload: LoginRequest) => {
	const { $apiFetch } = useNuxtApp();

	return await $apiFetch<LoginResponse>("/v1/auth/login", {
		method: "POST",
		body: payload,
	});
};

export const getProfileService = async () => {
	const { $apiFetch } = useNuxtApp();

	return await $apiFetch<ProfileResponse>("/v1/auth/profile");
};

export const logoutService = async () => {
	const { $apiFetch } = useNuxtApp();

	return await $apiFetch<{ message: string }>("/v1/auth/logout", {
		method: "POST",
	});
};
