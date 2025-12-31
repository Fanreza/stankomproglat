<script setup lang="ts">
import { toast } from "vue-sonner";
import { useUserService } from "@/services/user.services";
import type { CreateUserDto } from "@/models/user.model";
import { Eye, EyeOff } from "lucide-vue-next";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Tambah User",
});

const { create, loading } = useUserService();

const form = ref<CreateUserDto>({
	name: "",
	email: "",
	password: "",
});

const showPassword = ref(false);

const handleSubmit = async () => {
	if (!form.value.name || !form.value.email || !form.value.password) {
		toast.error("Semua field harus diisi");
		return;
	}

	try {
		await create(form.value);
		toast.success("User berhasil ditambahkan");
		navigateTo("/admin/user");
	} catch (err: any) {
		toast.error(err?.data?.message || "Gagal menambahkan user");
	}
};

const handleCancel = () => navigateTo("/admin/user");
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-2xl font-semibold text-gray-900">Tambah User</h1>
				<p class="text-sm text-gray-500 mt-1">Tambahkan user baru ke sistem</p>
			</div>
		</div>

		<!-- Form -->
		<div class="rounded-lg border border-gray-200 bg-white p-6">
			<form @submit.prevent="handleSubmit" class="space-y-6">
				<!-- Nama -->
				<div class="space-y-2">
					<Label for="name" class="text-sm font-medium text-gray-700"> Nama <span class="text-red-500">*</span> </Label>
					<Input id="name" v-model="form.name" type="text" placeholder="Masukkan nama lengkap" required class="w-full" />
				</div>

				<!-- Email -->
				<div class="space-y-2">
					<Label for="email" class="text-sm font-medium text-gray-700"> Email <span class="text-red-500">*</span> </Label>
					<Input id="email" v-model="form.email" type="email" placeholder="contoh@email.com" required class="w-full" />
				</div>

				<!-- Password -->
				<div class="space-y-2">
					<Label for="password" class="text-sm font-medium text-gray-700"> Password <span class="text-red-500">*</span> </Label>
					<div class="relative">
						<Input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Masukkan password" required class="w-full pr-10" />
						<button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
							<Eye v-if="!showPassword" class="h-5 w-5" />
							<EyeOff v-else class="h-5 w-5" />
						</button>
					</div>
					<p class="text-xs text-gray-500">Password minimal 8 karakter</p>
				</div>

				<!-- Actions -->
				<div class="flex items-center gap-3 pt-4">
					<Button type="submit" :disabled="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6">
						<span v-if="loading">Menyimpan...</span>
						<span v-else>Simpan</span>
					</Button>
					<Button type="button" variant="outline" @click="handleCancel" :disabled="loading"> Batal </Button>
				</div>
			</form>
		</div>
	</div>
</template>
