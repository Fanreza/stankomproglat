<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useStatisticService } from "@/services/stats.services";
import { useStatisticCategoryService } from "@/services/stats-scategory.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Edit Statistik",
});

const route = useRoute();
const router = useRouter();
const { get, update, responseGet, loading } = useStatisticService();
const { getAll: getCategories, response: categories } = useStatisticCategoryService();

const form = ref({
	name: "",
	number: 0,
	link: "",
	categoryId: undefined as number | undefined,
});

onMounted(async () => {
	await getCategories();

	try {
		await get(Number(route.params.id));
		if (responseGet.value) {
			form.value.name = responseGet.value.name;
			form.value.number = responseGet.value.number;
			form.value.link = responseGet.value.link;
			form.value.categoryId = responseGet.value.categoryId ?? undefined;
		}
	} catch {
		toast.error("Gagal memuat data statistik.");
	}
});

const handleSubmit = async () => {
	if (!form.value.name || form.value.number === null || !form.value.categoryId) {
		toast.error("Nama, angka, dan kategori wajib diisi.");
		return;
	}

	try {
		await update(Number(route.params.id), form.value);
		toast.success("Data statistik berhasil diperbarui.");
		router.push("/admin/stats");
	} catch {
		toast.error("Gagal memperbarui data statistik.");
	}
};

const handleCancel = () => router.back();
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Edit Statistik</h1>
			<Button @click="handleCancel" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6"> Kembali </Button>
		</div>

		<!-- Loading -->
		<div v-if="loading" class="flex justify-center py-20 text-gray-500">
			<span class="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></span>
			Memuat data statistik...
		</div>

		<!-- Form -->
		<div v-else class="space-y-10">
			<!-- Nama -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Nama</label>
				<Input v-model="form.name" placeholder="Masukkan nama statistik" />
			</div>

			<!-- Angka -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Angka</label>
				<Input v-model.number="form.number" type="number" placeholder="Masukkan nilai statistik" />
			</div>

			<!-- Kategori -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Kategori</label>
				<Select v-model="form.categoryId">
					<SelectTrigger>
						<SelectValue placeholder="Pilih kategori statistik" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem v-for="cat in categories?.data" :key="cat.id" :value="cat.id">
							{{ cat.name }}
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<!-- Actions -->
			<div class="flex justify-end gap-3 pt-4 border-t">
				<Button variant="outline" @click="handleCancel">Batal</Button>
				<AdminAppLoadingButton :loading="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium" @click="handleSubmit"> Perbarui </AdminAppLoadingButton>
			</div>
		</div>
	</div>
</template>
