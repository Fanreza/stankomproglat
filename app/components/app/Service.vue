<script setup lang="ts">
import { useServicesService } from "@/services/service.services";
import { ArrowRight } from "lucide-vue-next";

const { getAll, response, loading } = useServicesService();
const cards = computed(() => response.value?.data || []);

onMounted(async () => {
	try {
		await getAll(true); // ✅ public endpoint
	} catch {
		console.warn("Gagal memuat layanan, fallback ke default.");
	}
});

const onNavigateService = () => navigateTo("/service");
</script>

<template>
	<section class="bg-gray-50 py-16 md:py-24">
		<div class="container mx-auto px-4">
			<!-- Section Title -->
			<h2 class="mb-12 text-center font-semibold text-gray-900 text-xl md:text-3xl lg:text-4xl">Layanan Tersedia</h2>

			<!-- Loading Skeleton -->
			<div v-if="loading" class="grid gap-5 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
				<div v-for="i in 4" :key="i" class="w-[80%] md:w-full py-12 px-5 bg-white rounded-2xl shadow-sm">
					<Skeleton class="h-16 w-16 mx-auto mb-4 rounded-full" />
					<Skeleton class="h-6 w-3/4 mx-auto mb-2" />
					<Skeleton class="h-4 w-5/6 mx-auto mb-4" />
					<Skeleton class="h-9 w-full rounded-md" />
				</div>
			</div>

			<!-- Service Cards -->
			<div v-else class="grid gap-5 xl:gap-12 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
				<div v-for="(card, i) in cards" :key="card.id || i" class="flex flex-col items-center rounded-2xl bg-white w-[80%] md:w-full py-12 px-5 xl:px-16 shadow-sm transition-shadow hover:shadow-md">
					<div class="relative mb-6">
						<Icon :name="card.icon || 'streamline:interface-folder-archive-solid'" class="text-6xl" />
					</div>

					<h3 class="mb-4 text-xl xl:text-3xl font-bold text-primary text-center">{{ card.title }}</h3>
					<p class="mb-6 text-center text-sm xl:text-base leading-relaxed text-gray-600 flex-1">
						{{ card.description }}
					</p>

					<NuxtLink :href="card.link" target="_blank" rel="noopener noreferrer" class="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#163E93] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 mt-auto">
						<span>Kunjungi Website</span>
						<ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
					</NuxtLink>
				</div>
			</div>

			<!-- Other Button -->
			<div class="text-center mt-10">
				<Button variant="ghost" class="border-[#00384C] border-solid border cursor-pointer" @click="onNavigateService">
					<span> Lainnya </span>
					<Icon name="ion:arrow-forward" class="text-xl" />
				</Button>
			</div>
		</div>
	</section>
</template>
