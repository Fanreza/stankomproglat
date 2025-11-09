import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Announcement, CreateAnnouncementDto, UpdateAnnouncementDto } from "~/models/announcement.model";

export const useAnnouncementsService = () => {
	const { $apiFetch } = useNuxtApp();

	// 🧩 Reactive states
	const response = ref<ApiResponse<Announcement[]> | null>(null);
	const responseGet = ref<Announcement | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// ✅ GET ALL
	const getAll = async (params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<Announcement[]>>("/announcements", {
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

	// ✅ GET ONE
	const get = async (id: number) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<Announcement>(`/announcements/${id}`);
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// ✅ CREATE
	const create = async (payload: CreateAnnouncementDto) => {
		loading.value = true;
		error.value = null;

		try {
			const formData = new FormData();
			formData.append("title", payload.title);
			formData.append("description", payload.description);
			if (payload.file) formData.append("file", payload.file);

			const res = await $apiFetch<ApiResponse<Announcement>>("/announcements", {
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

	// ✅ UPDATE
	const update = async (id: number, payload: UpdateAnnouncementDto) => {
		loading.value = true;
		error.value = null;

		try {
			const formData = new FormData();
			if (payload.title) formData.append("title", payload.title);
			if (payload.description) formData.append("description", payload.description);
			if (payload.file) formData.append("file", payload.file);

			const res = await $apiFetch<Announcement>(`/announcements/${id}`, {
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

	// ✅ DELETE
	const remove = async (id: number) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<{ message: string }>>(`/announcements/${id}`, {
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
