<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useSocialMediaPostService } from "@/services/post.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Edit Postingan Media Sosial",
});

const route = useRoute();
const router = useRouter();
const { get, update, responseGet, loading } = useSocialMediaPostService();

const form = ref({
	platform: "INSTAGRAM",
	postLink: "",
});

// 🧩 Fetch detail post
onMounted(async () => {
	try {
		await get(Number(route.params.id));
		if (responseGet.value) {
			form.value.platform = responseGet.value.platform;
			form.value.postLink = responseGet.value.postLink;
		}
	} catch {
		toast.error("Gagal memuat data postingan.");
	}
});

const handleSubmit = async () => {
	try {
		await update(Number(route.params.id), form.value);
		toast.success("Postingan berhasil diperbarui.");
		router.push("/admin/post");
	} catch {}
};

const handleCancel = () => router.back();
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Edit Postingan</h1>
			<Button @click="handleCancel" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6">Kembali</Button>
		</div>

		<div v-if="loading" class="flex justify-center py-20 text-gray-500">
			<span class="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></span>
			Memuat data...
		</div>

		<div v-else class="space-y-10">
			<!-- Post Link -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Link Postingan</label>
				<Input v-model="form.postLink" placeholder="https://www.instagram.com/p/DRoEQEnkrvz/" />
			</div>

			<!-- Actions -->
			<div class="flex justify-end gap-3 pt-4 border-t">
				<Button variant="outline" @click="handleCancel">Batal</Button>
				<AdminAppLoadingButton :loading="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium" @click="handleSubmit"> Perbarui </AdminAppLoadingButton>
			</div>
		</div>
	</div>
</template>
