<template>
	<div class="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
		<div class="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-sm">
			<!-- LEFT SIDE (Illustration) -->
			<div class="hidden w-1/2 items-center justify-center bg-white p-8 md:flex">
				<img src="/images/admin/login.png" alt="Login Illustration" class="w-3/4" />
			</div>

			<!-- RIGHT SIDE (Form) -->
			<div class="flex w-full flex-col justify-center space-y-6 p-8 md:w-1/2">
				<div class="text-center">
					<h1 class="text-2xl font-semibold text-gray-900">CMS</h1>
					<p class="text-gray-600">Silahkan Masukkan Akun Admin</p>
				</div>

				<form @submit.prevent="onSubmit" class="space-y-5">
					<!-- Email -->
					<div>
						<label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
						<div class="relative">
							<Input v-model="form.email" type="email" placeholder="Masukkan Email" class="pl-10" required />
							<Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
						</div>
					</div>

					<!-- Password -->
					<div>
						<label class="mb-1 block text-sm font-medium text-gray-700">Password</label>
						<div class="relative">
							<Input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Masukkan Password" class="pl-10 pr-10" required />
							<Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" @click="showPassword = !showPassword">
								<Eye v-if="!showPassword" class="h-4 w-4" />
								<EyeOff v-else class="h-4 w-4" />
							</button>
						</div>
					</div>

					<!-- Button -->
					<Button type="submit" class="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold" :disabled="auth.loading">
						{{ auth.loading ? "Memproses..." : "Masuk" }}
					</Button>

					<!-- Error message -->
					<p v-if="errorMessage" class="text-red-500 text-sm text-center">
						{{ errorMessage }}
					</p>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
	layout: false, // tidak pakai layout sidebar
	middleware: "guest",
});

const auth = useAuthStore();

const form = ref({
	email: "",
	password: "",
});

const showPassword = ref(false);
const errorMessage = ref("");

// Handle login submit
const onSubmit = async () => {
	errorMessage.value = "";
	try {
		await auth.login({
			email: form.value.email,
			password: form.value.password,
		});
		await navigateTo("/admin"); // redirect ke dashboard
	} catch (err: any) {
		errorMessage.value = "Email atau password salah.";
		console.error("Login failed:", err);
	}
};
</script>
