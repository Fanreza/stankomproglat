import type { ApiResponse } from "~/models/response-wrapper.model";
import type { RolesResponsibilities, UpdateRolesResponsibilitiesDto } from "~/models/function.model";

export const useRolesResponsibilitiesService = () => {
	const { $apiFetch } = useNuxtApp();

	const response = ref<ApiResponse<RolesResponsibilities> | null>(null);
	const responseGet = ref<RolesResponsibilities | null>(null);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	// 🧩 GET roles & responsibilities
	const endpoint = (isPublic = false) => (isPublic ? "/public/roles-responsibilities" : "/roles-responsibilities");

	const get = async (isPublic = false) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<ApiResponse<RolesResponsibilities>>(endpoint(isPublic));
			response.value = res;
			responseGet.value = res.data;
			return res;
		} catch (err: any) {
			error.value = err;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// 🧩 UPDATE roles & responsibilities
	const update = async (payload: UpdateRolesResponsibilitiesDto) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await $apiFetch<RolesResponsibilities>("/roles-responsibilities", {
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

	return {
		response,
		responseGet,
		loading,
		error,
		get,
		update,
	};
};
