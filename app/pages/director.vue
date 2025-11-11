<template>
	<section class="bg-white py-16 md:py-24">
		<!-- Title -->
		<AppUiPageHeader title="Profil Direktur Stankomproglat" :breadcrumbs="['Profil', 'Profil Direktur']" />

		<div class="mx-auto mt-12 max-w-6xl px-6">
			<!-- Loading & Error -->
			<div v-if="loading" class="text-gray-500 text-center py-12">Memuat data...</div>

			<!-- Konten -->
			<div v-else-if="currentDirector" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
				<!-- Foto Direktur Aktif -->
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

				<!-- Detail -->
				<div>
					<p class="font-semibold text-gray-800 mb-2">Latar Belakang :</p>
					<p class="text-gray-700 leading-relaxed mb-4">
						{{ currentDirector.detail || "Tidak ada informasi latar belakang." }}
					</p>

					<p class="font-semibold text-gray-800 mb-2">Pencapaian :</p>
					<ul class="list-disc pl-5 space-y-1 text-gray-700">
						<li v-for="(ach, index) in defaultAchievements" :key="index">
							{{ ach }}
						</li>
					</ul>
				</div>
			</div>

			<!-- Direktur Sebelumnya -->
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
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useDirectorProfileService } from "@/services/director.services";

const { getAll, response, loading } = useDirectorProfileService();

onMounted(async () => {
	await getAll(true);
});

const defaultAchievements = ["Meningkatkan anggota organisasi 300%", "Meluncurkan program sertifikasi digital", "Membangun kemitraan internasional"];

const directors = computed(() => response.value?.data || []);
// current director = yang order-nya paling kecil (biasanya 1)
const currentDirector = computed(() => directors.value.find((d) => d.order === 1));

// past directors = sisanya, urutkan berdasarkan order naik
const pastDirectors = computed(() => directors.value.filter((d) => d.order !== 1).sort((a, b) => a.order - b.order));
</script>

<style scoped>
img {
	transition: transform 0.3s ease;
}
img:hover {
	transform: scale(1.02);
}
</style>
