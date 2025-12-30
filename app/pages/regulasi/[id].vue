<template>
	<section class="bg-white py-16 md:py-24">
		<AppUiPageHeader title="Regulasi" :breadcrumbs="['Info', 'Regulasi', 'Detail']" />

		<!-- Loading -->
		<div v-if="loading" class="text-center py-20 text-gray-500">Memuat regulasi...</div>

		<!-- Error -->
		<div v-else-if="error" class="text-center py-20 text-red-600">Gagal memuat regulasi.</div>

		<!-- Konten -->
		<div v-else-if="responseGet" class="container mx-auto px-4 py-10">
			<!-- Judul & Info -->
			<div class="mb-8">
				<h1 class="text-4xl font-bold text-[#163E93] mb-4">
					{{ responseGet.title }}
				</h1>

				<div class="flex items-center gap-3 mb-6">
					<span class="text-sm text-gray-500">
						{{ formatDate(responseGet.createdAt) }}
					</span>

					<Badge class="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium">
						{{ responseGet.createdBy?.name || "Admin" }}
					</Badge>
				</div>
			</div>

			<!-- Isi Konten -->
			<div class="prose prose-blue max-w-none text-gray-700 leading-relaxed mb-8" v-html="responseGet.description"></div>

			<!-- Attachment -->
			<div v-if="responseGet.attachment" class="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
				<h3 class="text-lg font-semibold text-gray-900 mb-3">Lampiran Dokumen</h3>
				<a :href="responseGet.attachment" target="_blank" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					<span class="font-medium">Unduh Dokumen Lampiran</span>
				</a>
			</div>

			<!-- Tombol Kembali -->
			<div class="mt-10">
				<NuxtLink to="/regulasi" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					<span class="font-medium">Kembali ke Daftar Regulasi</span>
				</NuxtLink>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRegulationsService } from "@/services/regulation.services";

const route = useRoute();
const id = parseInt(route.params.id as string);

const { get, responseGet, loading, error } = useRegulationsService();

const formatDate = (date: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return new Date(date).toLocaleDateString("id-ID", options);
};

const fetchRegulationDetail = async () => {
	try {
		await get(id);
	} catch (err) {
		console.error("Gagal memuat detail regulasi:", err);
	}
};

onMounted(() => {
	fetchRegulationDetail();
});
</script>

<style scoped>
.prose p {
	margin-bottom: 1rem;
}
</style>
