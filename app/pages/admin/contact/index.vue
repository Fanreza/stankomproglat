<template>
  <div class="flex-1 space-y-6 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Contact Information</h1>
      </div>
    </div>

    <!-- Table -->
    <div class="relative overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader class="bg-gray-50">
          <TableRow>
            <TableHead class="w-[50px] text-gray-700 text-sm font-medium">No</TableHead>
            <TableHead class="text-gray-700 text-sm font-medium">Field</TableHead>
            <TableHead class="text-gray-700 text-sm font-medium">Value</TableHead>
            <TableHead class="text-center text-gray-700 text-sm font-medium w-[120px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <!-- Loading -->
          <TableRow v-if="loading">
            <TableCell colspan="4" class="py-8 text-center text-gray-500">
              <div class="flex items-center justify-center gap-2">
                <span class="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></span>
                Memuat data...
              </div>
            </TableCell>
          </TableRow>

          <!-- Data -->
          <TableRow v-for="(contact, index) in contacts" :key="contact.id" class="hover:bg-gray-50 transition-colors">
            <TableCell class="text-gray-700">
              {{ index + 1 }}
            </TableCell>

            <TableCell class="font-medium text-gray-900">{{ formatKey(contact.key) }}</TableCell>
            <TableCell class="text-gray-700 max-w-md">
              <div class="line-clamp-2">{{ contact.value }}</div>
            </TableCell>

            <TableCell class="text-center">
              <div class="flex items-center justify-center gap-3">
                <button class="p-1.5 rounded-md text-gray-600 hover:text-blue-700 transition-colors" @click="handleEdit(contact.id)">
                  <Pencil class="h-4 w-4" />
                </button>
              </div>
            </TableCell>
          </TableRow>

          <!-- Empty -->
          <TableRow v-if="!loading && contacts.length === 0">
            <TableCell colspan="4" class="text-center py-8 text-gray-500">Belum ada data contact.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pencil } from 'lucide-vue-next';
import { useContactService } from '~/services/contact.services';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});

const { response, loading, getAll } = useContactService();

const contacts = computed(() => response.value?.data || []);

onMounted(async () => {
  await getAll();
});

const formatKey = (key: string) => {
  if (key === 'map_url') return 'Map URL';
  if (key === 'address') return 'Address';
  if (key === 'contact') return 'Contact';
  return key;
};

const handleEdit = (id: number) => navigateTo(`/admin/contact/${id}/edit`);
</script>
