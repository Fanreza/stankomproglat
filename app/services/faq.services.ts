import type { ApiResponse } from "~/models/response-wrapper.model";
import type { FAQ, CreateFaqDto, UpdateFaqDto } from "~/models/faq.model";

export const useFaqService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<FAQ[]> | null>(null);
	const responseGet = ref<FAQ | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const endpoint = (isPublic = false) => (isPublic ? "/public/faq" : "/faq");

	const getAll = async (params?: { page?: number; perPage?: number }, isPublic = false) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<ApiResponse<FAQ[]>>(endpoint(isPublic), { params });
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
			const res = await $apiFetch<FAQ>(`/faq/${id}`);
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const create = async (payload: CreateFaqDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<FAQ>("/faq", {
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

	const update = async (id: number, payload: UpdateFaqDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<FAQ>(`/faq/${id}`, {
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
			await $apiFetch(`/faq/${id}`, { method: "DELETE" });
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
