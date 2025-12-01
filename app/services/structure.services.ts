import type { ApiResponse } from "~/models/response-wrapper.model";
import type { Structure, UpdateStructureDto } from "~/models/structure.model";

export const useStructureService = () => {
	const { $apiFetch } = useNuxtApp();

	const responseGet = ref<ApiResponse<Structure> | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// 🧩 Get
	const get = async () => {
		loading.value = true;
		try {
			const res = await $apiFetch<ApiResponse<Structure>>("/structures");
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const getPublic = async () => {
		loading.value = true;
		try {
			const res = await $apiFetch<ApiResponse<Structure>>("/public/structure");
			responseGet.value = res;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// 🧩 Update
	const update = async (payload: UpdateStructureDto) => {
		loading.value = true;
		try {
			const formData = new FormData();
			if (payload.file) formData.append("file", payload.file);

			const res = await $apiFetch<ApiResponse<Structure>>("/structures", {
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

	return { responseGet, loading, error, get, update, getPublic };
};
