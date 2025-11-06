<script setup lang="ts">
definePageMeta({
	layout: "admin", // 🟢 pakai layout sidebar
	middleware: "admin",
});

const auth = useAuthStore();
</script>

<template>
	<div>
		<h1 class="text-3xl font-bold mb-4">Welcome, {{ auth.user?.name }}</h1>
		<p class="text-gray-600">Ini adalah halaman dashboard.</p>
	</div>
</template>
