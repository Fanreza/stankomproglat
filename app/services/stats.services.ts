import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Statistic, CreateStatisticDto, UpdateStatisticDto } from "~/models/stats.model";

export const useStatisticService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<Statistic[]> | null>(null);
	const responseGet = ref<Statistic | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const endpoint = (isPublic = false) => (isPublic ? "/public/statistics" : "/statistics");

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
