<template>
	<section class="bg-white py-16 md:py-24">
		<AppUiPageHeader title="Pengumuman Resmi" :breadcrumbs="['Info', 'Pengumuman']" />
		<div class="mx-auto w-[80%]">
			<div v-if="loading" class="py-12 text-center text-gray-500">Memuat pengumuman...</div>
			<div v-else-if="error" class="py-12 text-center text-red-600">Gagal memuat pengumuman.</div>
			<div v-else class="space-y-10">
				<AppUiDocumentItem v-for="document in documents" :key="document.id" :id="document.id" :title="document.title" :description="document.description" :date="formatDate(document.createdAt)" :attachment="document.attachment!" />
			</div>
			<div v-if="!documents.length && !loading" class="text-center text-gray-500 py-12">Tidak ada pengumuman untuk saat ini.</div>
			<AppUiPagination v-if="totalPages > 1" :current-page="params.page" :total-pages="totalPages" @update:current-page="handlePageChange" class="mt-8" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAnnouncementsService } from "@/services/announcement.services";

const { getAll, response, loading, error } = useAnnouncementsService();
const params = ref({ page: 1 });

const formatDate = (date: string) => {
	const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
	return new Date(date).toLocaleDateString("id-ID", options);
};

const fetchAnnouncements = async () => {
	try {
		await getAll(true, params.value);
	} catch (err) {}
};

const documents = computed(() => response.value?.data || []);
const totalPages = computed(() => response.value?.meta?.totalPages || 1);

const handlePageChange = async (page: number) => {
	params.value.page = page;
	await fetchAnnouncements();
};

onMounted(() => {
	fetchAnnouncements();
});
</script>
