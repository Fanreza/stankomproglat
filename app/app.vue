<script setup>
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";

useSeoMeta({
	title: "Stankomproglat",
	ogTitle: "Stankomproglat",
	description: "Stankomproglat adalah lembaga dibawah naungan Kementrian Ketenagakerjaan",
	ogDescription: "Stankomproglat adalah lembaga dibawah naungan Kementrian Ketenagakerjaan",
});

useHead({
	script: [
		{
			src: "https://platform.twitter.com/widgets.js",
			async: true,
			type: "text/javascript",
		},
	],
});
</script>

<template>
	<Html lang="en">
		<Toaster richColors />

		<div>
			<NuxtLayout>
				<NuxtLoadingIndicator color="#4981F9" />
				<NuxtPage />
			</NuxtLayout>
		</div>
	</Html>
</template>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
	transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
