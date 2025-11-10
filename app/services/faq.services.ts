import type { ApiResponse } from "~/models/response-wrapper.model";
import type { FAQ, CreateFaqDto, UpdateFaqDto } from "~/models/faq.model";

export const useFaqService = () => {
	const { $apiFetch } = useNuxtApp();

	// 🔄 State utama
	const response = ref<ApiResponse<FAQ[]> | null>(null); // getAll → pakai wrapper
	const responseGet = ref<FAQ | null>(null); // getOne → tanpa wrapper
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// 🧩 Get All (pakai wrapper)
	const getAll = async (params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<ApiResponse<FAQ[]>>("/faq", { params });
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

	// 🧩 Create
	const create = async (payload: CreateFaqDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<FAQ>("/faq", {
				method: "POST",
				body: payload,
			});

			// Auto append ke cache kalau data sudah ada
			if (response.value?.data) {
				response.value.data.unshift(res);
				response.value.meta!.totalItems++;
			}

			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// 🧩 Update
	const update = async (id: number, payload: UpdateFaqDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<FAQ>(`/faq/${id}`, {
				method: "PATCH",
				body: payload,
			});

			// Update cache kalau ada
			if (response.value?.data) {
				const idx = response.value.data.findIndex((f) => f.id === id);
				if (idx !== -1) response.value.data[idx] = res;
			}

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
			await $apiFetch(`/faq/${id}`, { method: "DELETE" });

			// Hapus dari cache
			if (response.value?.data) {
				response.value.data = response.value.data.filter((f) => f.id !== id);
				response.value.meta!.totalItems--;
			}
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
