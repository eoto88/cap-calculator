<template>
  <v-app>
    <v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="6">
            <h1 class="text-h5 pt-2">Calculatrice de projet - Colline aux pins</h1>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn @click="svg">SVG</v-btn>
            <v-btn class="mr-3" elevation="2" rounded title="Charger un projet" @click="uploadDialog = true"><v-icon>mdi-upload</v-icon></v-btn>
            <v-btn class="mr-3" elevation="2" rounded title="Télécharger le projet" @click="downloadProject"><v-icon>mdi-download-box</v-icon></v-btn>
            <v-divider style="height: 45%" color="rgba(0, 0, 0, 0.5)" vertical></v-divider>
            <v-btn class="ml-3 theme-btn" elevation="2" rounded title="Changer de thème" @click="toggleTheme"><v-icon>mdi-theme-light-dark</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
    <v-container class="fill-height align-start">
      <v-row>
        <v-col cols="5">
          <v-text-field label="Nom du projet" v-model="project.title" :rules="[projectTitleRules.required]"></v-text-field>
          <v-text-field label="Nom du client" v-model="project.client"></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field label="Date butoir" v-model="project.deadline"></v-text-field>
          <v-text-field label="Coût total" readonly v-model="calculateTotalCost"></v-text-field>
        </v-col>
        <v-col cols="2" class="text-right">
          {{ formatDate(project.dateCreation) }}
          {{ formatDate(project.dateLastUpdate) }}
        </v-col>
        <v-col cols="12">
          <h2 class="pb-3">Pièces ({{ project.pieces.length }}) <v-btn class="add-btn" density="comfortable" icon="mdi-plus" @click="createPiece"></v-btn></h2>
          <PiecesTable :pieces="project.pieces" @edit="editPiece" @delete="deletePiece" />

          <PieceDialog v-model="pieceDialog" :piece="piece" @save="savePiece" @close="closeDialog()" />

          <v-dialog v-model="uploadDialog" width="400">
            <v-card>
              <v-card-text>
                <v-file-input accept="application/json" label="File input" v-model="file"></v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="upload">Importer le projet</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <AreYouSureDialog v-model="areYouSureDialog" :message="confirmDeleteMessage" title="Supprimer une pièce" @close="handleOnDeleteClose" @confirm="handleOnDeleteConfirm" />

          <svg id="drawing" viewBox="0 0 2100 2100" xmlns="http://www.w3.org/2000/svg"></svg>
        </v-col>
      </v-row>
    </v-container>
    <v-footer elevation="3" height="50" class="d-flex align-center flex-column"><div>Version {{ version }}</div></v-footer>
  </v-app>
</template>

<script setup>
import * as uuid from 'uuid';
import PieceDialog from '~/components/PieceDialog.vue';
import download from 'downloadjs/download'
import Piece from '~/lib/models/Piece';
import Project from '~/lib/models/Project';
import { useTheme } from 'vuetify'
import {formatDatetime} from '~/lib/helpers/date';

const project = ref(new Project());
const pieceDialog = ref(false)
const uploadDialog = ref(false);
const areYouSureDialog = ref(false);
let areYouSureDialogConfirmFn = () => {}
const confirmDeleteMessage = ref('');
const file = ref([]);
const piece = ref(undefined);

const runtimeConfig = useRuntimeConfig()
const version = ref(runtimeConfig.public.clientVersion);

const projectTitleRules = {
  required: value => !!value || 'Le nom du projet est obligatoire',
};

const theme = useTheme();

const calculateTotalCost = computed({
  get() {
    return project.value.getTotalCost();
  },
  set(newValue) {
    //
  }
})

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const formatDate = (date) => {
  return formatDatetime(date)
}

const editPiece = (p) => {
  piece.value = new Piece(toRaw(p));
  pieceDialog.value = true;
}

const deletePiece = (piece) => {
  areYouSureDialog.value = true;
  confirmDeleteMessage.value = `Êtes-vous sûr de vouloir supprimer la pièce « ${piece.title} »?`;
  areYouSureDialogConfirmFn = () => {
    project.value.deletePiece(piece);
  }
}

const savePiece = (piece) => {
  if (piece.id === undefined) {
    piece.id = uuid.v4();
    project.value.addPiece(piece);
  } else {
    project.value.updatePiece(piece);
  }
  pieceDialog.value = false;
}

const createPiece = () => {
  piece.value = new Piece();
  pieceDialog.value = true
}

const closeDialog = () => {
  pieceDialog.value = false;
}

const handleOnDeleteClose = () => {
  areYouSureDialog.value = false;
}

const handleOnDeleteConfirm = (piece) => {
  areYouSureDialog.value = false;
  areYouSureDialogConfirmFn();
}

const upload = () => {
  const fr = new FileReader();

  fr.onload = e => {
    const result = JSON.parse(e.target.result);
    project.value = new Project(result);
  }
  fr.readAsText(toRaw(file.value)[0]);

  uploadDialog.value = false;
}
const downloadProject = () => {
  if (project.value.title) {
    download(JSON.stringify(project.value.toObject()), `${project.value.title}.json`, "text/plain");
  } else {
    alert('Le projet doit avoir au moins un nom!');
  }
}

const svg = async () => {
  const MTN_94 = await $fetch('/colors.json');

  const isDark = (c) => {
    var c = c.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 80) {
      return true;
    }
    return false;
  }

  var drawing = document.getElementById('drawing');

  const squareWidth = 120;
  const squareTranslate = squareWidth + 20;

  let yIndex = 0;
  MTN_94.colors.forEach((p, i, arr) => {
    const nbPerRow = 15;
    let x = (Math.floor(i / nbPerRow) * squareTranslate) + (squareTranslate / 2);
    yIndex = i % nbPerRow === 0 ? 0 : yIndex + 1;
    let y = (yIndex * squareTranslate) + (squareTranslate / 2);
    const dark = isDark(p.color);

    let tspanTitle = `<tspan x="0" y="-20">${p.title}</tspan>`;
    if (p.title.length > 16) {
      const arrTitle = p.title.split(" ");
      if (arrTitle.length === 2) {
        tspanTitle = `<tspan x="0" y="-40">${arrTitle[0]}</tspan><tspan x="0" y="-20">${arrTitle[1]}</tspan>`;
      } else if (arrTitle.length === 3) {
        const debut = arrTitle[0].length > arrTitle[2].length ? arrTitle[0] : arrTitle[0] + ' ' + arrTitle[1];
        const fin = arrTitle[0].length > arrTitle[2].length ? arrTitle[1] + ' ' + arrTitle[2] : arrTitle[2];
        tspanTitle = `<tspan x="0" y="-40">${debut}</tspan><tspan x="0" y="-20">${fin}</tspan>`;
      }
    }

    drawing.innerHTML += `<g transform="translate(${x} ${y})">
        <rect x="-${squareWidth / 2}" y="-${squareWidth / 2}" width="${squareWidth}" height="${squareWidth}" rx="10" fill="${p.color}" />
        <text dominant-baseline="middle" text-anchor="middle" font-family="Helvetica" font-size="14px" fill="${dark ? 'white' : 'black'}" width="${squareWidth}">
            ${tspanTitle}
            <tspan x="0" y="0">${p.code}</tspan>
            <tspan x="0" y="20">${p.color}</tspan>
        </text>
      </g>`;
  });

  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(drawing);

//add name spaces.
  if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

//add xml declaration
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  download(source, `colors.svg`, "text/plain");
}
</script>

<style>


.add-btn:hover {
  background-color: rgb(var(--v-theme-success)) !important;
  color: white;
}

.theme-btn:hover {
  background-color: rgb(var(--v-theme-surface-variant)) !important;
  color: white;
}
</style>
