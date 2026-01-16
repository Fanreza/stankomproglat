import type { ApiResponse } from "~/models/response-wrapper.model";
import type { StatisticCategory, CreateStatisticCategoryDto, UpdateStatisticCategoryDto } from "~/models/stats-category.model";

export const useStatisticCategoryService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<StatisticCategory[]> | null>(null);
	const responseGet = ref<StatisticCategory | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const endpoint = (isPublic = false) => (isPublic ? "/public/statistics/categories" : "/statistics/categories");

	const getAll = async (isPublic = false, params?: Record<string, any>) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<StatisticCategory[]>>(endpoint(isPublic), {
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
			const res = await $apiFetch<StatisticCategory>(`/statistics/categories/${id}`);
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const create = async (payload: CreateStatisticCategoryDto) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<StatisticCategory>("/statistics/categories", {
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

	const update = async (id: number, payload: UpdateStatisticCategoryDto) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<StatisticCategory>(`/statistics/categories/${id}`, {
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
			await $apiFetch(`/statistics/categories/${id}`, { method: "DELETE" });
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
