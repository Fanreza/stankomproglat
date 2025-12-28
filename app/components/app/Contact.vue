<template>
	<section class="bg-gray-50 mt-10 py-20" id="contact">
		<div>
			<!-- Left Side - Contact Info -->
			<div class="flex justify-center gap-8 flex-wrap">
				<!-- Alamat Kami -->
				<div v-if="addressData" class="flex gap-6 border border-gray-200 px-14 py-5 items-center">
					<!-- Icon -->
					<Icon class="text-6xl" name="streamline-color:chat-two-bubbles-oval-flat" />

					<!-- Content -->
					<div>
						<h3 class="mb-3 text-xl xl:text-3xl font-bold text-gray-900">Alamat Kami</h3>
						<div class="space-y-1 text-sm xl:text-base leading-relaxed text-[#363636]">
							<p v-html="addressData.value.replace(/\n/g, '<br>')"></p>
						</div>
					</div>
				</div>

				<!-- Kontak Kami -->
				<div v-if="contactData" class="flex gap-6 border border-gray-200 px-14 py-5 items-center">
					<!-- Icon -->
					<Icon class="text-6xl" name="streamline-color:chat-two-bubbles-oval-flat" />

					<!-- Content -->
					<div>
						<h3 class="mb-3 text-xl xl:text-3xl font-bold text-gray-900">Kontak Kami</h3>
						<div class="text-sm xl:text-base text-[#363636]">
							<p v-html="contactData.value.replace(/\n/g, '<br>')"></p>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Side - Google Maps -->
			<div v-if="mapData" class="relative h-[500px] mt-14">
				<iframe :src="mapData.value" width="100%" height="100%" style="border: 0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useContactService } from "~/services/contact.services";
import type { Contact } from "~/models/contact.model";

const { getAll } = useContactService();

const mapData = ref<Contact | null>(null);
const addressData = ref<Contact | null>(null);
const contactData = ref<Contact | null>(null);

onMounted(async () => {
	const res = await getAll(true);
	if (res?.data) {
		for (const item of res.data) {
			if (item.key === "map_url") mapData.value = item;
			else if (item.key === "address") addressData.value = item;
			else if (item.key === "contact") contactData.value = item;
		}
	}
});
</script>
