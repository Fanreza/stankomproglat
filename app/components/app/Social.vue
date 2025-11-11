<template>
	<section class="relative bg-primary py-16 md:py-20">
		<div class="container relative z-10 mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Sosial Media</h2>

			<!-- Loading Skeleton -->
			<div v-if="loading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<div v-for="i in 3" :key="i" class="animate-pulse bg-white/10 rounded-xl h-[450px]"></div>
			</div>

			<!-- Carousel -->
			<Carousel v-else-if="embeds.length > 0" class="mx-auto w-full" :opts="{ align: 'start', loop: true }" ref="carouselRef" @init-api="(api) => (emblaApi = api)">
				<CarouselContent class="-ml-4">
					<CarouselItem v-for="(embed, index) in embeds" :key="index" class="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
						<div :class="['relative', 'md:pointer-events-auto', 'pointer-events-none']">
							<AppUiInstagramEmbed :url="embed" />
						</div>
					</CarouselItem>
				</CarouselContent>

				<!-- Dots -->
				<div class="mt-8 flex items-center justify-center gap-4">
					<button v-for="(_, index) in embeds.length" :key="index" @click="scrollTo(index)" class="h-2 rounded-full transition-all duration-300" :class="current === index ? 'w-36 scale-110 bg-white' : 'w-2 scale-100 bg-white/40 hover:bg-white/60'" :aria-label="`Slide ${index + 1}`"></button>
				</div>
			</Carousel>

			<!-- Empty State -->
			<div v-else class="text-center text-blue-100 py-16">Tidak ada postingan media sosial.</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useSocialMediaPostService } from "@/services/post.services";
import { toast } from "vue-sonner";

const { getAll, response, loading } = useSocialMediaPostService();

const embeds = ref<string[]>([]);
const carouselRef = ref();
const emblaApi = ref<CarouselApi>();
const current = ref(0);

const autoplay = Autoplay({
	delay: 5000,
	stopOnInteraction: false,
});

// Fetch public posts
onMounted(async () => {
	try {
		await getAll({}, true);
		const posts = response.value?.data || [];
		embeds.value = posts.map((p) => p.postLink).filter(Boolean);
	} catch {
		toast.error("Gagal memuat data media sosial.");
	}
});

watch(emblaApi, (api) => {
	if (!api) return;
	api.on("select", () => (current.value = api.selectedScrollSnap()));
	const autoplayPlugin = api.plugins().autoplay;
	if (autoplayPlugin) autoplayPlugin.play();
});

const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);
</script>
