<script setup lang="ts">
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useFaqService } from "@/services/faq.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
});

const router = useRouter();
const { create, loading } = useFaqService();

// 🧩 Form
const form = ref({
	question: "",
	answer: "",
	createdById: 1, // bisa diganti dengan user login nanti
});

const handleSubmit = async () => {
	if (!form.value.question || !form.value.answer) {
		toast.error("Pertanyaan dan jawaban wajib diisi");
		return;
	}

	try {
		await create(form.value);
		toast.success("FAQ berhasil dibuat!");
		router.push("/admin/faq");
	} catch {
		toast.error("Gagal membuat FAQ.");
	}
};

const handleCancel = () => router.back();
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-semibold text-gray-900">Tambah FAQ</h1>
			<Button @click="handleCancel" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6">Kembali</Button>
		</div>

		<!-- Form -->
		<div class="space-y-10">
			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Pertanyaan</label>
				<Input v-model="form.question" placeholder="Masukkan pertanyaan" />
			</div>

			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-800">Jawaban</label>
				<Textarea v-model="form.answer" placeholder="Masukkan jawaban" rows="4" />
			</div>

			<!-- Actions -->
			<div class="flex justify-end gap-3 pt-4 border-t">
				<Button variant="outline" @click="handleCancel">Batal</Button>
				<AdminAppLoadingButton :loading="loading" class="bg-blue-900 hover:bg-blue-800 text-white font-medium" @click="handleSubmit">Simpan</AdminAppLoadingButton>
			</div>
		</div>
	</div>
</template>
