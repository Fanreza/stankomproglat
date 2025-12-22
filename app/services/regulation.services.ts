import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Regulation, CreateRegulationDto, UpdateRegulationDto } from "~/models/regulation.model";

export const useRegulationsService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<Regulation[]> | null>(null);
	const responseGet = ref<Regulation | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const endpoint = (isPublic = false) => (isPublic ? "/public/regulations" : "/regulations");

	const getAll = async (isPublic = false, params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<Regulation[]>>(endpoint(isPublic), {
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
			const res = await $apiFetch<Regulation>(`/regulations/${id}`);
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const create = async (payload: CreateRegulationDto) => {
		loading.value = true;
		error.value = null;

		try {
			const formData = new FormData();
			formData.append("title", payload.title);
			formData.append("description", payload.description);
			if (payload.file) formData.append("file", payload.file);

			const res = await $apiFetch<ApiResponse<Regulation>>("/regulations", {
				method: "POST",
				body: formData,
			});

			if (response.value?.data) {
				response.value.data.unshift(res.data);
			}

			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const update = async (id: number, payload: UpdateRegulationDto) => {
		loading.value = true;
		error.value = null;

		try {
			const formData = new FormData();
			if (payload.title) formData.append("title", payload.title);
			if (payload.description) formData.append("description", payload.description);
			if (payload.file) formData.append("file", payload.file);

			const res = await $apiFetch<Regulation>(`/regulations/${id}`, {
				method: "PUT",
				body: formData,
			});

			if (response.value?.data) {
				const idx = response.value.data.findIndex((a) => a.id === id);
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

	const remove = async (id: number) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<{ message: string }>>(`/regulations/${id}`, {
				method: "DELETE",
			});

			if (response.value?.data) response.value.data = response.value.data.filter((item) => item.id !== id);

			return res;
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
