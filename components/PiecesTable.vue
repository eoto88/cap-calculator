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
      <td>{{ item.totalCost }}</td>
      <td>
        <v-btn icon size="small" @click="edit(item)" title="Edit"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon size="small" @click="del(item)" title="Delete"><v-icon>mdi-delete</v-icon></v-btn>
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
