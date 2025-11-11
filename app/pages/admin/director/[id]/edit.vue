<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { UploadCloud } from "lucide-vue-next";
import { useDirectorProfileService } from "@/services/director.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Edit Profil Direktur",
});

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const { get, update, responseGet, loading } = useDirectorProfileService();

const form = ref({
	order: undefined as number | undefined,
	beginYear: new Date().getFullYear(),
	endYear: undefined as number | undefined,
	name: "",
	detail: "",
	file: null as File | null,
});

const previewUrl = ref<string | null>(null);

// 🧩 Fetch existing data
onMounted(async () => {
	try {
		const res = await get(id);
		if (!res) return;
		form.value = {
			order: res.order,
			beginYear: res.beginYear,
			endYear: res.endYear ?? undefined,
			name: res.name,
			detail: res.detail,
			file: null,
		};
		if (res.file) previewUrl.value = res.file;
	} catch {
		toast.error("Gagal memuat data direktur.");
	}
});

// 🧩 Handle file upload
const handleFileChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.files?.length) {
		form.value.file = target.files[0]!;
		previewUrl.value = URL.createObjectURL(target.files[0]!);
	}
};

// 🧩 Handle submit
const handleSubmit = async () => {
	if (!form.value.name || !form.value.beginYear) {
		toast.error("Nama dan tahun mulai wajib diisi.");
		return;
	}

	try {
		await update(id, form.value);
		toast.success("Profil direktur berhasil diperbarui.");
		router.push("/admin/director");
	} catch {
		toast.error("Gagal memperbarui data direktur.");
	}
};

// 🧩 Cancel
const handleCancel = () => router.back();
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Edit Profil Direktur</h1>
			<Button variant="outline" @click="handleCancel">Kembali</Button>
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

			<!-- Detail -->
			<div>
				<label class="block text-sm font-medium">Detail</label>
				<Textarea v-model="form.detail" placeholder="Deskripsi singkat atau detail tugas" rows="4" />
			</div>

			<!-- Upload -->
			<div>
				<label class="block text-sm font-medium">Foto</label>

				<div v-if="!previewUrl" class="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-400 transition">
					<UploadCloud class="h-8 w-8 mb-2 text-gray-400" />
					<span class="text-sm font-medium">Klik untuk upload atau drag & drop</span>
					<input type="file" class="absolute inset-0 opacity-0 cursor-pointer" @change="handleFileChange" />
				</div>

				<div v-else class="relative mt-2 rounded-lg overflow-hidden border group max-w-xs">
					<img :src="previewUrl" alt="Preview" class="object-cover w-full h-56 bg-gray-50" />
					<input type="file" class="absolute inset-0 opacity-0 cursor-pointer" @change="handleFileChange" />

					<div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
						<Button variant="outline" size="sm" class="text-xs">Ganti Foto</Button>
					</div>
				</div>
			</div>

			<!-- Action -->
			<div class="flex justify-end border-t pt-4 gap-3">
				<Button variant="outline" @click="handleCancel">Batal</Button>
				<AdminAppLoadingButton :loading="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6" @click="handleSubmit"> Simpan Perubahan </AdminAppLoadingButton>
			</div>
		</div>
	</div>
</template>
