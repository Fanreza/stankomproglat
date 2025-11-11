import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Statistic, CreateStatisticDto, UpdateStatisticDto } from "~/models/stats.model";

export const useStatisticService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<Statistic[]> | null>(null); // wrapper utk list
	const responseGet = ref<Statistic | null>(null); // non-wrapper utk detail
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// 🧩 Get All
	const endpoint = (isPublic = false) => (isPublic ? "/public/statistics" : "/statistics");

	// 🧩 Get All (wrapper)
	const getAll = async (isPublic = false, params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<ApiResponse<Statistic[]>>(endpoint(isPublic), { params });
			response.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// 🧩 Get One
	const get = async (id: number) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<Statistic>(`/statistics/${id}`);
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
	const create = async (payload: CreateStatisticDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<Statistic>("/statistics", {
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
	const update = async (id: number, payload: UpdateStatisticDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<Statistic>(`/statistics/${id}`, {
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
			await $apiFetch(`/statistics/${id}`, { method: "DELETE" });
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
