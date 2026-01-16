import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Service, CreateServiceDto, UpdateServiceDto } from "~/models/service.model";

export const useServicesService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<Service[]> | null>(null);
	const responseGet = ref<Service | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const endpoint = (isPublic = false) => (isPublic ? "/public/services" : "/services");

	const getAll = async (isPublic = false, params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<Service[]>>(endpoint(isPublic), { params });
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
			const res = await $apiFetch<Service>(`/services/${id}`);
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const create = async (payload: CreateServiceDto) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<Service>("/services", {
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

	const update = async (id: number, payload: UpdateServiceDto) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<Service>(`/services/${id}`, {
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
			await $apiFetch(`/services/${id}`, { method: "DELETE" });
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
