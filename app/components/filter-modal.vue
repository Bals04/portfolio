<template>
    <div class="custom-body">
        <!-- Pass the flag prop to the Modal -->
        <Modal size="xl" :title="modalTitle" :show="props.isModalOpen" class="custom-modal" @close="handleClose">
            <template #modal-body>

            </template>
        </Modal>
    </div>
</template>

<script setup>

const props = defineProps({
    isModalOpen: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['close'])

const handleClose = () => {
    emit('close')
}

</script>
