<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Edit {{ formatKey(contact?.key || '') }}</h1>
        <p class="text-muted-foreground">Perbarui informasi kontak</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <Skeleton class="h-12 w-full" />
      <Skeleton class="h-32 w-full" />
      <Skeleton class="h-10 w-24" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-destructive">
      {{ error }}
    </div>

    <!-- Edit Form -->
    <Card v-else-if="contact" class="p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2">
          <Label>Field</Label>
          <div class="px-3 py-2 bg-muted rounded-md">
            {{ formatKey(contact.key) }}
          </div>
        </div>

        <div class="space-y-2">
          <Label for="value">Isi</Label>
          <Textarea
            id="value"
            v-model="formData.value"
            :placeholder="getPlaceholder(contact.key)"
            :rows="contact.key === 'map_url' ? 3 : 5"
            required
          />
        </div>

        <div class="flex gap-3">
          <AppLoadingButton
            type="submit"
            :loading="loading"
          >
            Simpan Perubahan
          </AppLoadingButton>
          <Button
            type="button"
            variant="outline"
            @click="navigateTo('/admin/contact')"
          >
            Batal
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue-sonner';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Skeleton } from '~/components/ui/skeleton';
import AppLoadingButton from '~/components/admin/AppLoadingButton.vue';
import { useContactService } from '~/services/contact.services';
import type { UpdateContactDto } from '~/models/contact.model';

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});

const route = useRoute();
const id = computed(() => Number(route.params.id));

const { 
  responseGet, 
  loading, 
  error, 
  get, 
  update 
} = useContactService();

const contact = computed(() => responseGet.value);

const formData = reactive<UpdateContactDto>({
  value: ''
});

onMounted(async () => {
  await get(id.value);
  if (contact.value) {
    formData.value = contact.value.value;
  }
});

const formatKey = (key: string) => {
  if (key === 'map_url') return 'Map URL';
  if (key === 'address') return 'Address';
  if (key === 'contact') return 'Contact';
  return key;
};

const getPlaceholder = (key: string) => {
  if (key === 'map_url') return 'Masukkan URL Google Maps embed...';
  if (key === 'address') return 'Masukkan alamat...';
  if (key === 'contact') return 'Masukkan informasi kontak...';
  return 'Masukkan isi...';
};

const handleSubmit = async () => {
  try {
    await update(id.value, formData);
    
    toast.success('Berhasil', {
      description: 'Informasi kontak berhasil diperbarui'
    });
    
    navigateTo('/admin/contact');
  } catch (err) {
    toast.error('Gagal', {
      description: 'Gagal memperbarui informasi kontak'
    });
  }
};
</script>
