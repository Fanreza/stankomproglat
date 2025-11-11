<script setup lang="ts">
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useSocialMediaPostService } from "@/services/post.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "Tambah Postingan",
});

const router = useRouter();
const { create, loading } = useSocialMediaPostService();

const form = ref({
	platform: "",
	postLink: "",
	createdById: 1,
});

const handleSubmit = async () => {
	try {
		await create(form.value);
		toast.success("Postingan berhasil dibuat.");
		router.push("/admin/post");
	} catch {}
};

const handleCancel = () => router.back();
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Tambah Postingan Media Sosial</h1>
			<Button @click="handleCancel" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6">Kembali</Button>
		</div>

		<div class="space-y-10">
			<!-- Platform -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Platform</label>
				<Input v-model="form.platform" placeholder="Contoh: Facebook, Instagram" />
			</div>

			<!-- Post Link -->
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Link Postingan</label>
				<Input v-model="form.postLink" placeholder="https://facebook.com/post/..." />
			</div>

			<!-- Actions -->
			<div class="flex justify-end gap-3 pt-4 border-t">
				<Button variant="outline" @click="handleCancel">Batal</Button>
				<AdminAppLoadingButton :loading="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium" @click="handleSubmit"> Simpan </AdminAppLoadingButton>
			</div>
		</div>
	</div>
</template>
