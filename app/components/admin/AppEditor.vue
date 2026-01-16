<script setup lang="ts">
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/vue-3";

const props = defineProps<{
	modelValue: string;
}>();

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void;
}>();

const editor = useEditor({
	content: props.modelValue,
	extensions: [StarterKit],
	onUpdate: ({ editor }) => {
		emit("update:modelValue", editor.getHTML());
	},
});

watch(
	() => props.modelValue,
	(newVal) => {
		if (!editor.value) return;
		const current = editor.value.getHTML();
		if (newVal !== current) editor.value.commands.setContent(newVal);
	}
);

onBeforeUnmount(() => editor.value?.destroy());
</script>

<template>
	<TiptapProvider :editor="editor">
		<TiptapToolbar />
		<TiptapContent class="border rounded-md p-3 min-h-[200px]" />
		<TiptapStatusBar show-word-count />
	</TiptapProvider>
</template>
