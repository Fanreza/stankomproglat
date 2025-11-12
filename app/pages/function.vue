<script setup lang="ts">
import { onMounted } from "vue";
import { useRolesResponsibilitiesService } from "@/services/function.services";

// 🔹 Inisialisasi service
const { get, responseGet, loading, error } = useRolesResponsibilitiesService();

// 🔹 Lifecycle
onMounted(async () => {
	try {
		await get(true); // ambil endpoint publik
	} catch (err) {
		console.error("Failed to fetch roles & responsibilities:", err);
	}
});
</script>

<template>
	<section class="bg-white py-16 md:py-24">
		<!-- Title -->
		<AppUiPageHeader title="Tugas & Fungsi Stankomproglat" :breadcrumbs="['Profil', 'Tugas & Fungsi']" />

		<!-- Content -->
		<div class="mx-auto mt-12 max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
			<!-- Left Text -->
			<div class="order-last md:order-first">
				<!-- Visi -->
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Tugas</h2>

				<div v-if="loading" class="rounded-xl border border-slate-100 bg-white p-4 mb-8 shadow-sm text-gray-500 italic">Loading...</div>
				<div v-else-if="error" class="rounded-xl border border-red-100 bg-red-50 p-4 mb-8 text-red-700">Terjadi kesalahan saat memuat data.</div>

				<div v-else class="rounded-xl border border-slate-50 bg-white p-4 mb-8 shadow-sm">
					<p v-html="responseGet?.roles"></p>
				</div>

				<!-- Misi -->
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Fungsi</h2>

				<div v-if="!responseGet?.responsibilities" class="text-gray-500 italic">Data fungsi belum tersedia.</div>

				<div v-else class="rounded-xl border border-slate-50 bg-white p-4 mb-8 shadow-sm">
					<p v-html="responseGet.responsibilities"></p>
				</div>
			</div>

			<!-- Right Illustration -->
			<div class="flex justify-center order-first md:order-last w-[50%] lg:w-[80%] mx-auto">
				<img src="/images/role.png" alt="Illustration" class="w-full max-w-md" />
			</div>
		</div>
	</section>
</template>
