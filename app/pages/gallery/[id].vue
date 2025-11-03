<template>
	<section class="bg-white py-16 md:py-24">
		<!-- Title -->
		<AppUiPageHeader title="Galeri" :breadcrumbs="['Galeri']" />

		<!-- Hero / Banner -->
		<div class="container mx-auto px-4 py-10">
			<div class="rounded-2xl overflow-hidden shadow-sm">
				<img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" alt="Peluncuran Program Sertifikasi Baru" class="w-full h-[500px] object-cover" />
			</div>

			<!-- Judul & Info -->
			<div class="mt-8">
				<h1 class="text-4xl font-bold text-[#163E93] mb-4">Peluncuran Program Sertifikasi Baru</h1>

				<!-- Isi Konten -->
				<div class="text-sm max-w-none text-gray-700 leading-relaxed">
					<p>Sebagai bagian dari upaya meningkatkan kompetensi tenaga kerja Indonesia, program sertifikasi baru diluncurkan dengan tujuan memberikan pengakuan resmi terhadap keterampilan dan pengalaman kerja.</p>
					<p class="mt-3">Acara ini dihadiri oleh pejabat kementerian dan perwakilan industri yang berkomitmen mendukung peningkatan kualitas sumber daya manusia nasional.</p>
				</div>

				<!-- Grid Galeri -->
				<div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<!-- Card 1 -->
					<div class="group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
						<img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" alt="Foto 1" class="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
					</div>

					<!-- Card 2 -->
					<div class="group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
						<img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80" alt="Foto 2" class="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
					</div>

					<!-- Card 3 -->
					<div class="group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
						<img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" alt="Foto 3" class="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
					</div>

					<!-- Card 4 -->
					<div class="group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
						<img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" alt="Foto 4" class="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
