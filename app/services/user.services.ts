import type { ApiResponse } from "~/models/response-wrapper.model";
import type { User, CreateUserDto, UpdateUserDto } from "~/models/user.model";

export const useUserService = () => {
	const { $apiFetch } = useNuxtApp();

	// 🧩 Reactive states
	const response = ref<ApiResponse<User[]> | null>(null);
	const responseGet = ref<User | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// ✅ GET ALL
	const getAll = async (params?: { page?: number; perPage?: number; search?: string }) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<User[]>>("/users", {
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
			const res = await $apiFetch<User>(`/users/${id}`);
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
	const create = async (payload: CreateUserDto) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<ApiResponse<User>>("/users", {
				method: "POST",
				body: payload,
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
	const update = async (id: number, payload: UpdateUserDto) => {
		loading.value = true;
		error.value = null;

		try {
			const res = await $apiFetch<User>(`/users/${id}`, {
				method: "PATCH",
				body: payload,
			});

			if (response.value?.data) {
				const idx = response.value.data.findIndex((u) => u.id === id);
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
			const res = await $apiFetch<ApiResponse<{ message: string }>>(`/users/${id}`, {
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
