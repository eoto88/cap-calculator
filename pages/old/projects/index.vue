<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Projets <v-btn density="comfortable" icon="mdi-plus" @click="dialog = true"></v-btn></h1>
        <v-list>
          <v-list-item
            v-for="project in projects"
            :key="project.id"
            :href="`/project/${project.id}`"
          >
            <v-list-item-title>{{ project.title }} - {{ project.client }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-dialog v-model="dialog">
          <v-card>
            <v-card-text>
              <v-text-field label="Nom du projet" v-model="projectTitle"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="dialog = false">Annuler</v-btn>
              <v-btn color="primary" @click="createProject()">Sauvegarder</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import * as uuid from 'uuid';

const projects = ref([])
let dialog = ref(false)
let projectTitle = ref('');

const { data : projectsData } = await useFetch('http://localhost:3004/projects/');
projects.value = projectsData.value;

const createProject = async () => {
  const newId =  uuid.v4();
  const project = {
    id: newId,
    title: projectTitle.value
  };
  await $fetch('http://localhost:3004/projects', {
    method: 'POST',
    body: project
  });
  dialog.value = false;
  const router = useRouter();
  router.push({ path: `/project/${newId}` });
}
</script>
