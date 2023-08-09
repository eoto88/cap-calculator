<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <p class="mb-4"><NuxtLink to="/">Retour aux clients</NuxtLink></p>
        <v-text-field label="Nom du client" v-model="client.name"></v-text-field>

        <h2 class="pb-3">Projets <v-btn density="comfortable" icon="mdi-plus" @click="dialog = true"></v-btn></h2>
        <pre>{{ projects }}</pre>
      </v-col>
      <v-col cols="12">
        <v-list>
          <v-list-item
            v-for="project in projects"
            :key="project.id"
            :href="`/client/${route.params.clientId}/project/${project.id}`"
          >
            <v-list-item-title>
              <div class="d-flex">
                {{ project.title }}
                <v-spacer />
                Last update
                <v-spacer />
                <v-icon>{{ project.sent ? 'mdi-email-fast-outline' : 'mdi-head-sync-outline' }}</v-icon>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <PieceDialog v-model="dialog" @close="closeDialog()" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import PieceDialog from '~/components/PieceDialog.vue';

const client = ref({})
const projects = ref([])
const dialog = ref(false)
const route = useRoute()
const { data : clientData } = await useFetch(`http://localhost:3004/clients/${route.params.clientId}`);
client.value = clientData.value;

const { data : projectsData } = await useFetch(`http://localhost:3004/projects?clientId=${route.params.clientId}`);
projects.value = projectsData.value;

const closeDialog = () => {
  dialog.value =  false;
}
</script>
