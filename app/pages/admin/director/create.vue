<script setup lang="ts">
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { UploadCloud } from "lucide-vue-next";
import { useDirectorProfileService } from "@/services/director.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Tambah Profil Direktur",
});

const router = useRouter();
const { create, loading } = useDirectorProfileService();

const form = ref({
	order: 0,
	beginYear: 0,
	endYear: 0,
	name: "",
	detail: "",
	file: null as File | null,
});

const previewUrl = ref<string | null>(null);

const handleFileChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.files?.length) {
		form.value.file = target.files[0]!;
		previewUrl.value = URL.createObjectURL(target.files[0]!);
	}
};

const handleSubmit = async () => {
	try {
		form.value.beginYear = Number(form.value.beginYear);
		form.value.endYear = form.value.endYear ? Number(form.value.endYear) : 0;

		await create(form.value);
		toast.success("Profil direktur berhasil ditambahkan.");
		router.push("/admin/director");
	} catch {
		toast.error("Gagal menambahkan data direktur.");
	}
};
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Tambah Profil Direktur</h1>
		</div>

		<div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-6">
			<!-- Fields -->
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<label class="block text-sm font-medium">Urutan</label>
					<Input type="number" v-model="form.order" placeholder="Contoh: 1" />
				</div>
				<div>
					<label class="block text-sm font-medium">Nama</label>
					<Input v-model="form.name" placeholder="Nama direktur" />
				</div>
				<div>
					<label class="block text-sm font-medium">Tahun Mulai</label>
					<Input type="number" v-model="form.beginYear" placeholder="Contoh: 2018" />
				</div>
				<div>
					<label class="block text-sm font-medium">Tahun Selesai</label>
					<Input type="number" v-model="form.endYear" placeholder="Contoh: 2022" />
				</div>
			</div>

			<div>
				<label class="block text-sm font-medium">Detail</label>
				<Textarea v-model="form.detail" placeholder="Deskripsi singkat atau detail tugas" rows="4" />
			</div>

			<!-- Upload -->
			<div>
				<label class="block text-sm font-medium">Foto</label>
				<div class="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-400 transition">
					<UploadCloud class="h-8 w-8 mb-2 text-gray-400" />
					<span class="text-sm font-medium">Klik untuk upload atau drag & drop</span>
					<input type="file" class="absolute inset-0 opacity-0 cursor-pointer" @change="handleFileChange" />
				</div>

				<div v-if="previewUrl" class="mt-4">
					<img :src="previewUrl" class="max-h-56 rounded-lg border" />
				</div>
			</div>

			<!-- Action -->
			<div class="flex justify-end border-t pt-4">
				<Button class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6" :disabled="loading" @click="handleSubmit">
					{{ loading ? "Menyimpan..." : "Simpan" }}
				</Button>
			</div>
		</div>
	</div>
</template>
