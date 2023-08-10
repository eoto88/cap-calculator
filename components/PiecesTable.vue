<template>
  <v-table fixed-header>
    <thead>
    <tr>
      <th class="text-left">
        Nom de la pièce
      </th>
      <th class="text-left">
        Matériel
      </th>
      <th class="text-left">
        Coût matériel
      </th>
      <th class="text-left">
        Coût découpe
      </th>
      <th class="text-left">
        Coût sablage
      </th>
      <th class="text-left">
        Coût peinture
      </th>
      <th class="text-left">
        Ajustement
      </th>
      <th class="text-left">
        Total
      </th>
      <th class="text-left">
        Actions
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in pieces"
      :key="item.title"
    >
      <td>{{ item.title }}</td>
      <td>{{ item.material }}</td>
      <td>{{ item.materialCost }}</td>
      <td>{{ item.cutCost }}</td>
      <td>{{ item.sandingCost }}</td>
      <td>{{ item.paintCost }}</td>
      <td>{{ item.adjustment }}</td>
      <td class="totalCost">{{ item.totalCost }}</td>
      <td class="actions">
        <v-btn class="edit-btn" icon size="x-small" @click="edit(item)" title="Edit"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn class="btn-del ml-2" icon size="x-small" @click="del(item)" title="Delete"><v-icon>mdi-delete</v-icon></v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup>
defineProps({
  pieces: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['edit', 'delete'])

const edit = (piece) => {
  emit('edit', piece);
}

const del = (piece) => {
  emit('delete', piece);
}
</script>

<style>
.totalCost {
  border-left: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.edit-btn:hover {
  background-color: rgb(var(--v-theme-success)) !important;
  color: white;
}

.btn-del:hover {
  background-color: rgb(var(--v-theme-error)) !important;
  color: white;
}
</style>
