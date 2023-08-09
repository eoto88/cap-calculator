<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <p class="mb-4"><NuxtLink :to="`/client/${route.params.clientId}`">Retour aux projets</NuxtLink></p>
        <v-text-field label="Nom du projet" v-model="project.title"></v-text-field>
        <v-text-field label="Coût total" readonly></v-text-field>

        <h2 class="pb-3">Pièces <v-btn density="comfortable" icon="mdi-plus" @click="dialog = true"></v-btn></h2>
        <pre>{{ pieces }}</pre>
        {{ route.params }}
      </v-col>
      <v-col cols="12">
        <PiecesTable :pieces="pieces" />

        <PieceDialog v-model="dialog" @close="closeDialog()" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import PieceDialog from '~/components/PieceDialog.vue';
import { useUserStore } from '~/store/projects';

const project = ref({})
const pieces = ref([])
const dialog = ref(false)
const route = useRoute()
const { data : projectData } = await useFetch(`http://localhost:3004/projects/${route.params.id}`);
project.value = projectData.value;

const { data : piecesData } = await useFetch(`http://localhost:3004/pieces?projectId=${route.params.id}`);
pieces.value = piecesData.value;

const closeDialog = () => {
  dialog.value =  false;
}

// const getProject = async () => {
//   console.log(route.params.id);
//   const { data : data } = await useFetch(`http://localhost:3004/projects/${route.params.id}`);
//   console.log(data);
//   project.value = data || []
// }
//
// onMounted(getProject)

// export default {
//   name: "Project",
//   components: { PieceDialog },
//   data() {
//     return {
//       store: useUserStore(),
//       dialog: false,
//       // project: undefined,
//     }
//   },
//
//   computed: {
//     desserts() {
//       return this.store.users;
//     }
//   },
//
//   async fetch() {
//     const id = this.$route.params.id;
//     this.project = await $fetch(`http://localhost:3004/projects/${id}`);
//     console.log(this.project);
//   },
//
//   mounted() {
//     this.store.fetchUsers();
//   },
//
//   methods: {

//   }
// }
</script>
