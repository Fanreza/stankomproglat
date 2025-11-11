<template>
	<section class="bg-white py-16 md:py-24">
		<AppUiPageHeader title="Berita Terbaru" :breadcrumbs="['Info', 'Berita']" />

		<div class="mx-auto w-[80%]">
			<div class="mb-8 flex flex-wrap gap-2">
				<button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="['rounded-full px-4 py-2 text-sm font-medium transition-colors', selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
					{{ cat }}
				</button>
			</div>

			<div v-if="loadingNews || loadingCategories" class="py-12 text-center text-gray-500">Memuat berita...</div>

			<div v-else-if="errorNews || errorCategories" class="py-12 text-center text-red-600">Gagal memuat berita.</div>

			<div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<AppUiNewsCard v-for="news in filteredNews" :key="news.id" :image="news.image || '/images/default-news.jpg'" :date="formatDate(news.createdAt)" :category="news.category?.title || '-'" :title="news.title" :excerpt="news.excerpt" :slug="news.slug" />
			</div>

			<div v-if="!filteredNews.length && !loadingNews" class="py-12 text-center">
				<p class="text-gray-500">Tidak ada berita untuk kategori ini</p>
			</div>

			<AppUiPagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages" @update:current-page="handlePageChange" class="mt-12" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useNewsService } from "@/services/news.services";
import { useNewsCategoriesService } from "@/services/categories.services";

const { getAll: getAllNews, response: newsResponse, loading: loadingNews, error: errorNews } = useNewsService();
const { getAll: getAllCategories, response: categoryResponse, loading: loadingCategories, error: errorCategories } = useNewsCategoriesService();

const currentPage = ref(1);
const itemsPerPage = 6;
const selectedCategory = ref("Semua");

const formatDate = (date: string) => {
	const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
	return new Date(date).toLocaleDateString("id-ID", options);
};

const categories = computed(() => {
	const list = categoryResponse.value?.data?.map((cat) => cat.title) || [];
	return ["Semua", ...list];
});

const allNews = computed(() => newsResponse.value?.data || []);

const filteredNews = computed(() => {
	let filtered = selectedCategory.value === "Semua" ? allNews.value : allNews.value.filter((news) => news.category?.title === selectedCategory.value);
	return filtered;
});

const totalPages = computed(() => {
	return newsResponse.value?.meta?.totalPages || 1;
});

const fetchNews = async () => {
	try {
		await getAllNews(true, { page: currentPage.value });
	} catch (err) {
		console.error("Gagal fetch berita:", err);
	}
};

const fetchCategories = async () => {
	try {
		await getAllCategories(true);
	} catch (err) {
		console.error("Gagal fetch kategori:", err);
	}
};

const handlePageChange = async (page: number) => {
	currentPage.value = page;
	await fetchNews();
};

watch(selectedCategory, () => {
	currentPage.value = 1;
	fetchNews();
});

onMounted(async () => {
	await Promise.all([fetchCategories(), fetchNews()]);
});
</script>
