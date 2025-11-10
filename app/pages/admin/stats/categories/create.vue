<script setup lang="ts">
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useStatisticCategoryService } from "@/services/stats-scategory.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Tambah Kategori Statistik",
});

const router = useRouter();
const { create, loading } = useStatisticCategoryService();

const form = ref({
	name: "",
	link: "",
});

const handleSubmit = async () => {
	if (!form.value.name.trim() || !form.value.link.trim()) {
		toast.error("Nama dan link wajib diisi.");
		return;
	}

	try {
		await create(form.value);
		toast.success("Kategori berhasil dibuat.");
		router.push("/admin/stats/categories");
	} catch {
		toast.error("Gagal membuat kategori statistik.");
	}
};

const handleCancel = () => router.back();
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Tambah Kategori Statistik</h1>
			<Button @click="handleCancel" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6"> Kembali </Button>
		</div>

		<div class="space-y-10">
			<!-- Nama -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Nama Kategori</label>
				<Input v-model="form.name" placeholder="Masukkan nama kategori statistik" />
			</div>

			<!-- Link -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Link</label>
				<Input v-model="form.link" placeholder="https://example.com/statistik" />
			</div>

			<!-- Actions -->
			<div class="flex justify-end gap-3 pt-4 border-t">
				<Button variant="outline" @click="handleCancel">Batal</Button>
				<AdminAppLoadingButton :loading="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium" @click="handleSubmit"> Simpan </AdminAppLoadingButton>
			</div>
		</div>
	</div>
</template>
