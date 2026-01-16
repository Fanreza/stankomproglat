import type { ApiResponse } from "~/models/response-wrapper.model";
import type { SocialMediaPost, CreateSocialMediaPostDto, UpdateSocialMediaPostDto } from "~/models/post.model";

export const useSocialMediaPostService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<SocialMediaPost[]> | null>(null);
	const responseGet = ref<SocialMediaPost | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const endpoint = (isPublic = false) => (isPublic ? "/public/social-media-posts" : "/social-media-posts");

	const getAll = async (params?: { page?: number; perPage?: number; sortBy?: string }, isPublic = false) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<ApiResponse<SocialMediaPost[]>>(endpoint(isPublic), { params });
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
			const res = await $apiFetch<SocialMediaPost>(`/social-media-posts/${id}`);
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const create = async (payload: CreateSocialMediaPostDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<SocialMediaPost>("/social-media-posts", {
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

	const update = async (id: number, payload: UpdateSocialMediaPostDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<SocialMediaPost>(`/social-media-posts/${id}`, {
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
			await $apiFetch(`/social-media-posts/${id}`, { method: "DELETE" });
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
