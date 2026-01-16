<template>
	<section class="bg-white py-16 md:py-24">
		<AppUiPageHeader title="Profil Direktur Stankomproglat" :breadcrumbs="['Profil', 'Profil Direktur']" />

		<div class="mx-auto mt-12 max-w-6xl px-6">
			<div v-if="loading" class="text-gray-500 text-center py-12">Memuat data...</div>

			<div v-else-if="currentDirector" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
				<div class="flex justify-center">
					<div class="relative">
						<img :src="currentDirector.picture" alt="Foto Direktur" class="w-full max-w-sm rounded-2xl object-cover" />
						<div class="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-md shadow">
							<p class="text-xs text-blue-600 font-semibold">
								{{ currentDirector.beginYear }} –
								{{ currentDirector.endYear || "Sekarang" }}
							</p>
							<p class="font-semibold text-gray-900 text-lg">
								{{ currentDirector.name }}
							</p>
						</div>
					</div>
				</div>

				<div>
					<p class="font-semibold text-gray-800 mb-2">Latar Belakang :</p>
					<p class="text-gray-700 leading-relaxed mb-4">
						{{ currentDirector.detail || "Tidak ada informasi latar belakang." }}
					</p>
				</div>
			</div>

			<div v-if="pastDirectors.length" class="mt-16">
				<h2 class="text-xl font-bold text-gray-900 mb-6">Direktur Sebelumnya</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div v-for="(director, index) in pastDirectors" :key="index" class="rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition">
						<img :src="director.picture" alt="Foto Direktur" class="w-full h-56 object-cover rounded-t-xl" />
						<div class="p-4">
							<p class="text-sm text-blue-600 font-semibold">{{ director.beginYear }} – {{ director.endYear }}</p>
							<p class="text-lg font-semibold text-gray-900">
								{{ director.name }}
							</p>
							<p class="text-gray-700 leading-relaxed text-sm mt-2">
								{{ director.detail }}
							</p>
						</div>
					</div>
				</div>

				<AdminAppPagination v-if="response?.meta && response.meta.totalPages > 1" @update:page="onPageChange" :total="response.meta.totalItems" :per-page="response.meta.perPage" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useDirectorProfileService } from "@/services/director.services";

const { getAll, response, loading } = useDirectorProfileService();

const currentPage = ref(1);
const currentDirectorData = ref<any>(null);

const params = computed(() => ({
	page: currentPage.value,
	limit: 10,
}));

const fetchDirectors = async () => {
	await getAll(true, params.value);
};

onMounted(async () => {
	await getAll(true);
	const directors = response.value?.data || [];
	currentDirectorData.value = directors.find((d) => d.order === 1);

	await fetchDirectors();
});

const currentDirector = computed(() => currentDirectorData.value);

const pastDirectors = computed(() => {
	const directors = response.value?.data || [];
	return directors.filter((d) => d.order !== 1).sort((a, b) => a.order - b.order);
});

const onPageChange = (page: number) => {
	currentPage.value = page;
	fetchDirectors();
};
</script>

<style scoped>
img {
	transition: transform 0.3s ease;
}
img:hover {
	transform: scale(1.02);
}
</style>
