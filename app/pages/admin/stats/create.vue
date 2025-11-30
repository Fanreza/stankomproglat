<script setup lang="ts">
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useStatisticService } from "@/services/stats.services";
import { useStatisticCategoryService } from "@/services/stats-scategory.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Tambah Statistik",
});

const router = useRouter();
const { create, loading } = useStatisticService();
const { getAll: getCategories, response: categories } = useStatisticCategoryService();

const form = ref({
	name: "",
	number: 0,
	link: "",
	categoryId: null as number | null,
});

onMounted(async () => {
	await getCategories();
});

const handleSubmit = async () => {
	if (!form.value.name || form.value.number === null || !form.value.categoryId) {
		toast.error("Nama, angka, dan kategori wajib diisi.");
		return;
	}

	try {
		await create({
			name: form.value.name,
			number: form.value.number!,
			link: form.value.link,
			categoryId: form.value.categoryId!,
		});
		toast.success("Data statistik berhasil dibuat.");
		router.push("/admin/stats");
	} catch {
		toast.error("Gagal membuat data statistik.");
	}
};

const handleCancel = () => router.back();
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Tambah Statistik</h1>
			<Button @click="handleCancel" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6"> Kembali </Button>
		</div>

		<!-- Form -->
		<div class="space-y-10">
			<!-- Nama -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Nama</label>
				<Input v-model="form.name" placeholder="Masukkan nama statistik" />
			</div>

			<!-- Angka -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Angka</label>
				<Input v-model="form.number" type="number" placeholder="Masukkan nilai statistik" />
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
				<AdminAppLoadingButton :loading="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium" @click="handleSubmit"> Simpan </AdminAppLoadingButton>
			</div>
		</div>
	</div>
</template>
