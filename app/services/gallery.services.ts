import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Gallery, CreateGalleryDto, UpdateGalleryDto } from "~/models/gallery.model";

export const useGalleryService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<Gallery[]> | null>(null);
	const responseGet = ref<Gallery | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const endpoint = (isPublic = false) => (isPublic ? "/public/galleries" : "/gallery");

	const getAll = async (params?: { page?: number; search?: string }, isPublic = false) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<ApiResponse<Gallery[]>>(endpoint(isPublic), { params });
			response.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const get = async (id: number, isPublic = false) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<Gallery>(`${endpoint(isPublic)}/${id}`);
			// @ts-ignore
			responseGet.value = res.data || res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const create = async (payload: CreateGalleryDto) => {
		loading.value = true;
		error.value = null;

		try {
			const formData = new FormData();
			formData.append("title", payload.title);
			if (payload.description) formData.append("description", payload.description);
			if (payload.files?.length) payload.files.forEach((f) => formData.append("files", f));

			const res = await $apiFetch<Gallery>("/gallery", {
				method: "POST",
				body: formData,
			});
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const update = async (id: number, payload: UpdateGalleryDto) => {
		loading.value = true;
		error.value = null;

		try {
			const formData = new FormData();
			if (payload.title) formData.append("title", payload.title);
			if (payload.description) formData.append("description", payload.description);
			if (payload.files?.length) payload.files.forEach((f) => formData.append("files", f));

			const res = await $apiFetch<Gallery>(`/gallery/${id}`, {
				method: "PUT",
				body: formData,
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
			await $apiFetch(`/gallery/${id}`, { method: "DELETE" });
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const addImages = async (galleryId: number, files: File[]) => {
		loading.value = true;
		error.value = null;

		try {
			const formData = new FormData();
			files.forEach((f) => formData.append("files", f));

			const res = await $apiFetch<Gallery>(`/gallery/${galleryId}/upload-images`, {
				method: "POST",
				body: formData,
			});
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const deleteImage = async (galleryId: number, imageId: number) => {
		loading.value = true;
		error.value = null;

		try {
			await $apiFetch(`/gallery/${galleryId}/images/${imageId}`, {
				method: "DELETE",
			});
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
		addImages,
		deleteImage,
	};
};
