import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Gallery, CreateGalleryDto, UpdateGalleryDto } from "~/models/gallery.model";

export const useGalleryService = () => {
	const { $apiFetch } = useNuxtApp();

	// State utama
	const response = ref<Gallery[] | null>(null);
	const responseGet = ref<Gallery | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// 🧩 Get All
	const getAll = async (params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<Gallery[] | ApiResponse<Gallery[]>>("/gallery", { params });

			// Deteksi kalau API tidak pakai wrapper
			response.value = Array.isArray(res)
				? res // plain array
				: res.data; // wrapped
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
			const res = await $apiFetch<Gallery | ApiResponse<Gallery>>(`/gallery/${id}`);

			responseGet.value = (res as any).data ?? (res as Gallery);
			return responseGet.value;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// 🧩 Create
	const create = async (payload: CreateGalleryDto) => {
		loading.value = true;
		error.value = null;

		try {
			const formData = new FormData();
			formData.append("title", payload.title);
			if (payload.description) formData.append("description", payload.description);

			if (payload.files?.length) {
				payload.files.forEach((file) => formData.append("files", file));
			}

			const res = await $apiFetch<Gallery>("/gallery", {
				method: "POST",
				body: formData,
			});

			// update cache jika ada
			if (response.value) response.value.unshift(res);

			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// 🧩 Update (PUT, non-wrapped response)
	const update = async (id: number, payload: UpdateGalleryDto) => {
		loading.value = true;
		error.value = null;

		try {
			const formData = new FormData();
			if (payload.title) formData.append("title", payload.title);
			if (payload.description) formData.append("description", payload.description);

			if (payload.files?.length) {
				payload.files.forEach((file) => formData.append("files", file));
			}

			const res = await $apiFetch<Gallery>(`/gallery/${id}`, {
				method: "PUT",
				body: formData,
			});

			// update cache
			if (response.value) {
				const idx = response.value.findIndex((g) => g.id === id);
				if (idx !== -1) response.value[idx] = res;
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
			await $apiFetch(`/gallery/${id}`, { method: "DELETE" });

			if (response.value) {
				response.value = response.value.filter((g) => g.id !== id);
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
