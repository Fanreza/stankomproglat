<template>
	<section class="bg-white py-20 md:py-24" id="faq">
		<div class="container mx-auto px-4">
			<div class="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
				<!-- Left Side - Illustration -->
				<div class="flex items-center justify-center lg:sticky lg:top-32">
					<NuxtImg src="/images/faq.png" alt="FAQ Illustration" width="500" height="500" class="max-w-[50%] lg:max-w-[80%] xl:max-w-full h-auto" />
				</div>

				<!-- Right Side - FAQ -->
				<div class="flex flex-col justify-center">
					<h2 class="mb-8 text-center text-4xl font-bold text-gray-900 md:text-5xl">FAQ</h2>

					<!-- Loading Skeleton -->
					<div v-if="loading" class="space-y-4">
						<div v-for="i in 4" :key="i" class="animate-pulse">
							<div class="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
							<div class="h-4 w-2/3 bg-gray-200 rounded"></div>
						</div>
					</div>

					<!-- Accordion -->
					<Accordion v-else-if="faqs.length > 0" type="single" collapsible class="space-y-4">
						<AccordionItem v-for="(faq, index) in faqs" :key="faq.id" :value="`item-${index + 1}`" class="rounded-lg border px-6 data-[state=open]:border-[#0C2C71] data-[state=open]:text-primary">
							<AccordionTrigger class="text-left text-base font-medium hover:no-underline text-gray-900 data-[state=open]:text-primary">
								<div class="flex items-start gap-3">
									<span class="text-gray-500">{{ index + 1 }}.</span>
									<span>{{ faq.question }}</span>
								</div>
							</AccordionTrigger>

							<AccordionContent class="pl-7 pt-2 text-sm leading-relaxed text-gray-600">
								{{ faq.answer }}
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<!-- Empty State -->
					<p v-else class="text-center text-gray-500">Belum ada pertanyaan yang tersedia.</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useFaqService } from "@/services/faq.services";
import { toast } from "vue-sonner";

const { getAll, response, loading } = useFaqService();

const faqs = ref<any[]>([]);

onMounted(async () => {
	try {
		await getAll({}, true); // ambil dari /public/faq
		faqs.value = response.value?.data || [];
	} catch {
		toast.error("Gagal memuat FAQ publik.");
	}
});
</script>
