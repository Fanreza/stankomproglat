import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Service, CreateServiceDto, UpdateServiceDto } from "~/models/service.model";

export const useServicesService = () => {
	const { $apiFetch } = useNuxtApp();

	// 🔄 State utama
	const response = ref<ApiResponse<Service[]> | null>(null); // getAll → pakai wrapper
	const responseGet = ref<Service | null>(null); // getOne → tanpa wrapper
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// 🧩 Get All (pakai wrapper)
	const getAll = async (params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<Service[]>>("/services", { params });
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

	// 🧩 Create
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

	// 🧩 Update
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

	// 🧩 Delete
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
