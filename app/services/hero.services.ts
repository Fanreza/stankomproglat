import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Hero, UpdateHeroDto } from "~/models/hero.model";

export const useHeroService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<Hero> | null>(null);
	const responseGet = ref<Hero | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const endpoint = (isPublic = false) => (isPublic ? "/public/hero" : "/hero");

	const get = async (isPublic = false) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<ApiResponse<Hero>>(endpoint(isPublic));
			response.value = res;
			responseGet.value = res.data;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const update = async (payload: UpdateHeroDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<Hero>("/hero", {
				method: "PUT",
				body: payload,
			});
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const updateBanner = async (file: File) => {
		loading.value = true;
		error.value = null;
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await $apiFetch<ApiResponse<Hero>>("/hero/banner", {
				method: "PUT",
				body: formData,
			});
			response.value = res;
			responseGet.value = res.data;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	return { response, responseGet, loading, error, get, update, updateBanner };
};
