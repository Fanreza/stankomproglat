import type { ApiResponse } from "~/models/response-wrapper.model";
import type { SocialMedia, CreateSocialMediaDto, UpdateSocialMediaDto } from "~/models/sosmed.model";

export const useSocialMediaService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<SocialMedia[]> | null>(null);
	const responseGet = ref<SocialMedia | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const getAll = async (params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<ApiResponse<SocialMedia[]>>("/social-medias", {
				params,
			});
			response.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const get = async (id: number) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<SocialMedia>(`/social-medias/${id}`);
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const create = async (payload: CreateSocialMediaDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<SocialMedia>("/social-medias", {
				method: "POST",
				body: payload,
			});
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const update = async (id: number, payload: UpdateSocialMediaDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<SocialMedia>(`/social-medias/${id}`, {
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

	const remove = async (id: number) => {
		loading.value = true;
		error.value = null;
		try {
			await $apiFetch(`/social-medias/${id}`, { method: "DELETE" });
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	return {
		response,
		responseGet,
		loading,
		error,
		getAll,
		get,
		create,
		update,
		remove,
	};
};
