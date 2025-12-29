import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Contact, UpdateContactDto } from "~/models/contact.model";

export const useContactService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<Contact[]> | null>(null);
	const responseGet = ref<Contact | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// Helper endpoint
	const endpoint = (isPublic = false) => (isPublic ? "/public/contacts" : "/contacts");

	const getAll = async (isPublic = false, params?: { page?: number; perPage?: number }) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<Contact[]>>(endpoint(isPublic), {
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

	const get = async (id: number, isPublic = false) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<Contact>(`${endpoint(isPublic)}/${id}`);
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const update = async (id: number, payload: UpdateContactDto) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<Contact>(`/contacts/${id}`, {
				method: "PUT",
				body: {
					value: payload.value,
				},
			});

			if (response.value?.data) {
				const idx = response.value.data.findIndex((c) => c.id === id);
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

	const updateAll = async (payload: { id: number; value: string }[]) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<Contact[]>("/contacts", {
				method: "PUT",
				body: payload,
			});

			if (response.value?.data) {
				response.value.data = res;
			}

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
		update,
		updateAll,
	};
};
