<template>
	<section class="bg-white py-16 md:py-24">
		<AppUiPageHeader title="Berita Terbaru" :breadcrumbs="['Info', 'Berita']" />

		<div v-if="loading" class="text-center py-20 text-gray-500">Memuat berita...</div>

		<div v-else-if="error" class="text-center py-20 text-red-600">Gagal memuat berita.</div>

		<div v-else-if="responseGet" class="container mx-auto px-4 py-10">
			<div class="rounded-2xl overflow-hidden shadow-sm">
				<img :src="responseGet.image || '/images/default-news.jpg'" :alt="responseGet.title" class="w-full h-[500px] object-cover" />
			</div>

			<div class="mt-8">
				<h1 class="text-4xl font-bold text-[#163E93] mb-4">
					{{ responseGet.title }}
				</h1>

				<div class="flex items-center gap-3 mb-6">
					<span class="text-sm text-gray-500"> </span>

					<Badge v-if="responseGet.category" class="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium">
						{{ responseGet.category.title }}
					</Badge>
				</div>

				<div class="prose prose-blue max-w-none text-gray-700 leading-relaxed" v-html="responseGet.description"></div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useNewsService } from "@/services/news.services";

const route = useRoute();
const slug = route.params.slug as string;

const { getBySlug, getAll, responseGet, loading, error } = useNewsService();

const relatedNews = ref<any[]>([]);

const formatDate = (date: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return new Date(date).toLocaleDateString("id-ID", options);
};

const fetchNewsDetail = async () => {
	try {
		await getBySlug(slug);
	} catch (err) {
		console.error("Gagal memuat detail berita:", err);
	}
};

onMounted(() => {
	fetchNewsDetail();
});
</script>

<style scoped>
.prose p {
	margin-bottom: 1rem;
}
</style>
