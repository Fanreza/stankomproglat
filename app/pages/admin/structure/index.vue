<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { toast } from "vue-sonner";
import { UploadCloud } from "lucide-vue-next";
import { useStructureService } from "@/services/structure.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Struktur Organisasi",
});

const { get, update, loading } = useStructureService();

const previewUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

// 🧩 Load data existing
onMounted(async () => {
	try {
		const res = await get();
		if (res?.data?.image) {
			previewUrl.value = res.data.image;
		}
	} catch {
		toast.error("Gagal memuat struktur organisasi.");
	}
});

// 🧩 Upload handler
const handleFileChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.files?.length) {
		const file = target.files[0];
		selectedFile.value = file!;
		previewUrl.value = URL.createObjectURL(file!);
	}
};

// 🧩 Submit update
const handleSubmit = async () => {
	if (!selectedFile.value) {
		toast.error("Pilih gambar terlebih dahulu.");
		return;
	}

	try {
		await update({ file: selectedFile.value });
		toast.success("Struktur organisasi berhasil diperbarui.");
	} catch {
		toast.error("Gagal memperbarui struktur organisasi.");
	}
};
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Struktur Organisasi</h1>
		</div>

		<div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-8">
			<!-- Preview / Upload -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Gambar Struktur</label>
				<p class="text-xs text-gray-500 mb-1">Disarankan rasio gambar <b>16:9</b></p>

				<!-- Upload box (muncul saat tidak ada preview) -->
				<div v-if="!previewUrl" class="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-10 text-gray-500 hover:border-blue-400 transition">
					<UploadCloud class="h-8 w-8 mb-2 text-gray-400" />
					<span class="text-sm font-medium">Klik untuk upload atau drag & drop</span>
					<span class="text-xs text-gray-400">PNG, JPG, GIF (max. 2MB)</span>
					<span class="text-xs text-gray-400">Ratio 16:9</span>
					<input type="file" class="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" @change="handleFileChange" />
				</div>

				<!-- Preview -->
				<div v-else class="relative rounded-lg overflow-hidden border group w-full max-w-2xl">
					<ImagePreview :src="previewUrl" alt="Preview Struktur" />

					<!-- Tombol hapus -->
					<button
						type="button"
						class="absolute top-2 right-2 bg-white/80 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow"
						@click="
							previewUrl = null;
							selectedFile = null;
						"
					>
						✕
					</button>
				</div>
			</div>

			<!-- Submit -->
			<div class="flex justify-end border-t pt-4">
				<AdminAppLoadingButton :loading="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6" @click="handleSubmit"> Simpan Perubahan </AdminAppLoadingButton>
			</div>
		</div>
	</div>
</template>
