<script setup lang="ts">
import { toast } from "vue-sonner";
import { useUserService } from "@/services/user.services";
import type { UpdateUserDto } from "@/models/user.model";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Edit User",
});

const route = useRoute();
const userId = parseInt(route.params.id as string);

const { get, update, responseGet, loading } = useUserService();

const form = ref<UpdateUserDto>({
	name: "",
	email: "",
	password: "",
});

// Fetch user data
const fetchUser = async () => {
	try {
		await get(userId);
		if (responseGet.value) {
			form.value.name = responseGet.value.name;
			form.value.email = responseGet.value.email;
		}
	} catch (err) {
		toast.error("Gagal memuat data user");
		navigateTo("/admin/user");
	}
};

onMounted(fetchUser);

const handleSubmit = async () => {
	if (!form.value.name || !form.value.email) {
		toast.error("Nama dan email harus diisi");
		return;
	}

	try {
		const payload: UpdateUserDto = {
			name: form.value.name,
			email: form.value.email,
		};

		// Only include password if it's filled
		if (form.value.password) {
			payload.password = form.value.password;
		}

		await update(userId, payload);
		toast.success("User berhasil diperbarui");
		navigateTo("/admin/user");
	} catch (err: any) {
		toast.error(err?.data?.message || "Gagal memperbarui user");
	}
};

const handleCancel = () => navigateTo("/admin/user");
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-2xl font-semibold text-gray-900">Edit User</h1>
				<p class="text-sm text-gray-500 mt-1">Perbarui informasi user</p>
			</div>
		</div>

		<!-- Loading State -->
		<div v-if="loading && !responseGet" class="rounded-lg border border-gray-200 bg-white p-6">
			<div class="flex items-center justify-center py-8">
				<span class="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></span>
			</div>
		</div>

		<!-- Form -->
		<div v-else class="rounded-lg border border-gray-200 bg-white p-6">
			<form @submit.prevent="handleSubmit" class="space-y-6">
				<!-- Nama -->
				<div class="space-y-2">
					<Label for="name" class="text-sm font-medium text-gray-700">
						Nama <span class="text-red-500">*</span>
					</Label>
					<Input id="name" v-model="form.name" type="text" placeholder="Masukkan nama lengkap" required class="w-full" />
				</div>

				<!-- Email -->
				<div class="space-y-2">
					<Label for="email" class="text-sm font-medium text-gray-700">
						Email <span class="text-red-500">*</span>
					</Label>
					<Input id="email" v-model="form.email" type="email" placeholder="contoh@email.com" required class="w-full" />
				</div>

				<!-- Password -->
				<div class="space-y-2">
					<Label for="password" class="text-sm font-medium text-gray-700"> Password </Label>
					<Input id="password" v-model="form.password" type="password" placeholder="Kosongkan jika tidak ingin mengubah password" class="w-full" />
					<p class="text-xs text-gray-500">Kosongkan jika tidak ingin mengubah password</p>
				</div>

				<!-- Actions -->
				<div class="flex items-center gap-3 pt-4">
					<Button type="submit" :disabled="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6">
						<span v-if="loading">Menyimpan...</span>
						<span v-else>Simpan Perubahan</span>
					</Button>
					<Button type="button" variant="outline" @click="handleCancel" :disabled="loading"> Batal </Button>
				</div>
			</form>
		</div>
	</div>
</template>
