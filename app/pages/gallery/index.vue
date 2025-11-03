<!-- pages/info/berita.vue -->
<template>
	<section class="bg-white py-16 md:py-24">
		<!-- Title -->
		<AppUiPageHeader title="Galeri" :breadcrumbs="['Galeri']" />

		<div class="mx-auto w-[80%]">
			<!-- Grid -->
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<AppUiGalleryCard v-for="news in newsItems" :key="news.id" :image="news.image" :title="news.title" :excerpt="news.excerpt" :slug="news.slug" />
			</div>

			<!-- Empty State -->
			<div v-if="newsItems.length === 0" class="py-12 text-center">
				<p class="text-gray-500">Tidak ada Galeri</p>
			</div>

			<!-- Pagination -->
			<AppUiPagination v-if="totalPages > 1" :current-page="currentPage" :total-pages="totalPages" @update:current-page="currentPage = $event" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface NewsItem {
	id: number;
	image: string;
	title: string;
	excerpt: string;
	slug: string;
}

// Pagination
const currentPage = ref(1);
const itemsPerPage = 3;

// Sample news data (replace with API call)
const newsItems = ref<NewsItem[]>([
	{
		id: 1,
		image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",

		title: "Peluncuran Program Sertifikasi Baru",
		excerpt: "Organisasi meluncurkan program sertifikasi terbaru untuk meningkatkan kompetensi profesional...",
		slug: "peluncuran-program-sertifikasi-baru",
	},
	{
		id: 3,
		image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
		title: "Workshop Pelatihan Nasional 2025",
		excerpt: "Workshop pelatihan nasional akan diadakan di berbagai kota besar Indonesia...",
		slug: "workshop-pelatihan-nasional-2025",
	},
	{
		id: 4,
		image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
		title: "Workshop Pelatihan Nasional 2025",
		excerpt: "Workshop pelatihan nasional akan diadakan di berbagai kota besar Indonesia...",
		slug: "workshop-pelatihan-nasional-2025",
	},
	{
		id: 5,
		image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
		title: "Workshop Pelatihan Nasional 2025",
		excerpt: "Workshop pelatihan nasional akan diadakan di berbagai kota besar Indonesia...",
		slug: "workshop-pelatihan-nasional-2025",
	},
	{
		id: 6,
		image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
		title: "Workshop Pelatihan Nasional 2025",
		excerpt: "Workshop pelatihan nasional akan diadakan di berbagai kota besar Indonesia...",
		slug: "workshop-pelatihan-nasional-2025",
	},
]);

// Total pages
const totalPages = computed(() => {
	return Math.ceil(newsItems.value.length / itemsPerPage);
});
</script>
