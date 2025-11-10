<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useStatisticCategoryService } from "@/services/stats-scategory.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Edit Kategori Statistik",
});

const route = useRoute();
const router = useRouter();
const { get, update, responseGet, loading } = useStatisticCategoryService();

const form = ref({
	name: "",
	link: "",
});

// 🧩 Ambil data kategori
onMounted(async () => {
	try {
		await get(Number(route.params.id));

		if (responseGet.value) {
			form.value.name = responseGet.value.name;
			form.value.link = responseGet.value.link;
		}
	} catch {
		toast.error("Gagal memuat data kategori.");
	}
});

const handleSubmit = async () => {
	if (!form.value.name.trim() || !form.value.link.trim()) {
		toast.error("Nama dan link wajib diisi.");
		return;
	}

	try {
		await update(Number(route.params.id), form.value);
		toast.success("Kategori berhasil diperbarui.");
		router.push("/admin/stats/categories");
	} catch {
		toast.error("Gagal memperbarui kategori.");
	}
};

const handleCancel = () => router.back();
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Edit Kategori Statistik</h1>
			<Button @click="handleCancel" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6"> Kembali </Button>
		</div>

		<!-- Loading -->
		<div v-if="loading" class="flex justify-center py-20 text-gray-500">
			<span class="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></span>
			Memuat data kategori...
		</div>

		<!-- Form -->
		<div v-else class="space-y-10">
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
				<AdminAppLoadingButton :loading="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium" @click="handleSubmit"> Perbarui </AdminAppLoadingButton>
			</div>
		</div>
	</div>
</template>
