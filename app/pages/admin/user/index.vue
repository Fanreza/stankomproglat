<script setup lang="ts">
import { Pencil, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { useUserService } from "@/services/user.services";

definePageMeta({
	layout: "admin",
	middleware: "admin",
	title: "User",
});

const { getAll, remove, response, loading } = useUserService();

const searchQuery = ref("");
const currentPage = ref(1);

const params = computed(() => ({
	search: searchQuery.value,
	page: currentPage.value,
}));

const fetchData = async () => {
	try {
		await getAll(params.value);
	} catch (err) {
		toast.error("Gagal memuat data user");
	}
};

onMounted(fetchData);

const handleEdit = (id: number) => navigateTo(`/admin/user/${id}/edit`);

const selectedToDelete = ref<number | null>(null);
const showDeleteDialog = ref(false);

const confirmDelete = (id: number) => {
	selectedToDelete.value = id;
	showDeleteDialog.value = true;
};

const handleDelete = async () => {
	if (!selectedToDelete.value) return;
	try {
		await remove(selectedToDelete.value);
		toast.success("User berhasil dihapus");
		await fetchData();
	} catch {
		toast.error("Gagal menghapus user");
	} finally {
		showDeleteDialog.value = false;
	}
};

const onCreate = () => navigateTo("/admin/user/create");

const onPageChange = (page: number) => {
	currentPage.value = page;
	fetchData();
};
</script>

<template>
	<div class="flex-1 space-y-6 p-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-2xl font-semibold text-gray-900">Daftar User</h1>
			</div>
			<Button @click="onCreate" class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6"> Tambah User </Button>
		</div>

		<!-- Search -->
		<div class="flex items-center justify-between">
			<CommonDebouncedSearch v-model="searchQuery" placeholder="Cari user..." @search="fetchData" />
		</div>

		<!-- Table -->
		<div class="relative overflow-x-auto rounded-lg border border-gray-200 bg-white">
			<Table>
				<TableHeader class="bg-gray-50">
					<TableRow>
						<TableHead class="w-[50px] text-gray-700 text-sm font-medium">No</TableHead>
						<TableHead class="text-gray-700 text-sm font-medium">Nama</TableHead>
						<TableHead class="text-gray-700 text-sm font-medium">Email</TableHead>
						<TableHead class="text-gray-700 text-sm font-medium">Tanggal Dibuat</TableHead>
						<TableHead class="text-center text-gray-700 text-sm font-medium w-[120px]">Aksi</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					<!-- Loading -->
					<TableRow v-if="loading">
						<TableCell colspan="5" class="py-8 text-center text-gray-500">
							<div class="flex items-center justify-center gap-2">
								<span class="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></span>
								Memuat data...
							</div>
						</TableCell>
					</TableRow>

					<!-- Data -->
					<TableRow v-for="(item, index) in response?.data" :key="item.id" class="hover:bg-gray-50 transition-colors">
						<TableCell class="text-gray-700">
							{{ (currentPage - 1) * (response?.meta?.perPage || 10) + index + 1 }}
						</TableCell>

						<TableCell class="font-medium text-gray-900">{{ item.name }}</TableCell>
						<TableCell class="text-gray-700">{{ item.email }}</TableCell>
						<TableCell class="text-gray-700">
							{{ new Date(item.createdAt).toLocaleDateString("id-ID") }}
						</TableCell>

						<TableCell class="text-center">
							<div class="flex items-center justify-center gap-3">
								<button class="p-1.5 rounded-md text-gray-600 hover:text-blue-700 transition-colors" @click="handleEdit(item.id)">
									<Pencil class="h-4 w-4" />
								</button>
								<button class="p-1.5 rounded-md text-gray-600 hover:text-red-700 transition-colors" @click="confirmDelete(item.id)">
									<Trash2 class="h-4 w-4" />
								</button>
							</div>
						</TableCell>
					</TableRow>

					<!-- Empty -->
					<TableRow v-if="!loading && (!response?.data || response.data.length === 0)">
						<TableCell colspan="5" class="text-center py-8 text-gray-500">Belum ada user.</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>

		<!-- Pagination -->
		<AdminAppPagination v-if="response?.meta" @update:page="onPageChange" :total="response.meta.totalItems" :per-page="response.meta.perPage" />

		<!-- Delete Dialog -->
		<Dialog v-model:open="showDeleteDialog">
			<DialogContent class="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Konfirmasi Hapus</DialogTitle>
					<DialogDescription> Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan. </DialogDescription>
				</DialogHeader>
				<DialogFooter class="flex gap-2 sm:justify-end">
					<Button variant="outline" @click="showDeleteDialog = false">Batal</Button>
					<Button class="bg-red-600 hover:bg-red-700 text-white" @click="handleDelete" :disabled="loading">Hapus</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	</div>
</template>
