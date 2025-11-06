<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

<template>
	<SidebarProvider>
		<AdminAppSidebar />
		<main>
			<SidebarTrigger />
			<slot />
		</main>
	</SidebarProvider>
</template>
