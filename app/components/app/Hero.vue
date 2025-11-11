<template>
	<section class="relative h-screen w-full overflow-hidden">
		<!-- Background -->
		<div class="absolute inset-0">
			<!-- Kalau loading, tampilkan skeleton -->
			<div v-if="loading" class="h-full w-full bg-gray-200 animate-pulse"></div>

			<!-- Kalau sudah ada data -->
			<img v-else :src="heroData?.banner || '/images/hero.png'" alt="Hero Banner" class="h-full w-full object-cover" />

			<!-- Overlay -->
			<div class="absolute inset-0 bg-[#171717]/60 backdrop-blur-xs"></div>
		</div>

		<!-- Content -->
		<div class="relative z-10 flex h-full items-center justify-center px-4 text-center">
			<div class="max-w-4xl">
				<!-- Judul -->
				<div v-if="loading" class="space-y-3 mb-6">
					<Skeleton class="h-10 w-3/4 mx-auto" />
					<Skeleton class="h-10 w-1/2 mx-auto" />
				</div>

				<h1 v-else class="mb-6 text-2xl xl:text-7xl font-bold leading-tight text-white md:text-4xl lg:text-5xl animate-fade">
					{{ heroData?.heading || "Direktorat Bina Standardisasi Kompetensi dan Program Pelatihan" }}
				</h1>

				<!-- Subjudul -->
				<div v-if="loading" class="space-y-2 mb-8">
					<Skeleton class="h-5 w-5/6 mx-auto" />
					<Skeleton class="h-5 w-3/5 mx-auto" />
				</div>

				<p v-else class="mb-8 text-sm text-gray-100 md:text-xl lg:text-2xl animate-fade" style="animation-delay: 0.2s">
					{{ heroData?.subHeading || "Membangun pelatihan untuk masa depan yang lebih baik berarti menyiapkan sumber daya manusia yang unggul dan adaptif terhadap perubahan." }}
				</p>

				<!-- Tombol -->
				<div v-if="loading" class="flex justify-center">
					<Skeleton class="h-12 w-48 rounded-md" />
				</div>

				<Button v-else size="lg" class="group px-8 xl:px-10 py-6 xl:py-7 text-sm md:text-base animate-fade" style="animation-delay: 0.4s" @click="navigateToNews">
					<Icon name="iconamoon:send-fill" class="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
					Telusuri yang Terbaru
				</Button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
import { useHeroService } from "@/services/hero.services";

const { get, response, loading } = useHeroService();
const heroData = computed(() => response.value?.data || null);

onMounted(async () => {
	try {
		await get(true);
	} catch {
		console.warn("Gagal memuat data hero, fallback ke default.");
	}
});

const navigateToNews = () => navigateTo("#news");
</script>

<style scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade {
	animation: fadeIn 0.8s ease-out forwards;
}
</style>
