<template>
  <v-dialog
    v-model="internalValue"
    persistent
    width="auto"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="close"
        >
          Annuler
        </v-btn>
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="confirm"
        >
          Confirmer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'confirm'])

const internalValue = toRef(props, 'value');

const close = () => {
  emit('close');
}

const confirm = () => {
  emit('confirm');
}
</script>
