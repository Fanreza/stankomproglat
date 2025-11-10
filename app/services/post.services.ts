import type { ApiResponse } from "~/models/response-wrapper.model";
import type { SocialMediaPost, CreateSocialMediaPostDto, UpdateSocialMediaPostDto } from "~/models/post.model";

export const useSocialMediaPostService = () => {
	const { $apiFetch } = useNuxtApp();

	// 🧩 Reactive state
	const response = ref<ApiResponse<SocialMediaPost[]> | null>(null); // getAll pakai wrapper
	const responseGet = ref<SocialMediaPost | null>(null); // getOne tanpa wrapper
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// 🧩 Get All
	const getAll = async (params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<ApiResponse<SocialMediaPost[]>>("/social-media-posts", {
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

	// 🧩 Get One (tanpa wrapper)
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

	// 🧩 Create
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

	// 🧩 Update
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

	// 🧩 Delete
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
