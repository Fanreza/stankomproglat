<template>
	<div class="relative">
		<img v-if="src && !error" :src="src" :alt="alt" class="h-40 w-full object-cover rounded-md" @error="error = true" />

		<div v-else class="h-40 flex flex-col items-center justify-center bg-gray-50 text-gray-400 rounded-md">
			<ImageIcon class="h-10 w-10 mb-2" />
			<span class="text-sm font-medium">
				{{ error ? "Gambar gagal dimuat" : "Tidak ada gambar" }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ImageIcon } from "lucide-vue-next";

const props = defineProps<{
	src?: string | null;
	alt?: string;
}>();

const error = ref(false);

watch(
	() => props.src,
	() => {
		error.value = false;
	}
);
</script>
