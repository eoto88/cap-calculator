<template>
  <v-dialog v-model="internalValue">
    <v-card>
      <v-card-title>
        <h2 class="h2 py-6 ml-2">Ajout/Modification d'une pièce</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-text-field  label="Nom de la pièce" v-model="internalPiece.title"></v-text-field>
          </v-col>
          <v-col cols="8"></v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h3>Matériel</h3>
            <v-divider/>
          </v-col>
          <v-col cols="2"></v-col>
          <v-col cols="2">
            <v-select label="Matériel" :items="materials" item-title="title" item-value="id" v-model="internalPiece.material"></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Hauteur (en pouces)" type="number" v-model="internalPiece.height"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Largeur (en pouces)" type="number" v-model="internalPiece.width"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Coût du matériel" readonly v-model="calculateMaterialCost"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h3>Découpe</h3>
            <v-divider/>
          </v-col>

          <v-col cols="6"></v-col>
          <v-col cols="2">
            <v-text-field label="Temps de découpe (en minutes)" type="number" v-model="internalPiece.cutTime"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Coût de découpe" readonly v-model="calculateCutCost"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h3>Finitions</h3>
            <v-divider/>
          </v-col>

          <v-col cols="4"></v-col>
          <v-col cols="1">
            <h4>Sablage</h4>
          </v-col>
          <v-col cols="3">
            <v-checkbox
              label="Calculer selon le temps de découpe"
              v-model="internalPiece.baseSandingCostOnCutTime"
              @update:modelValue="handleOnUpdateBaseSandingTimeOnCutTime"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field label="Coût en sablage" :readonly="sandingCostReadonly" v-model="calculateSandingCost" @update:modelValue="handleOnUpdateSandingCost"></v-text-field>
          </v-col>

          <v-col cols="4"></v-col>
          <v-col cols="1">
            <h4>Peinture</h4>
          </v-col>
          <v-col cols="3">
            <v-checkbox
              label="Calculer selon l'aire du matériel"
              v-model="internalPiece.basePaintCostOnMaterialArea"
              @update:modelValue="handleOnUpdateBasePaintCostOnMaterialArea"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field label="Coût en peinture" :readonly="paintCostReadonly" v-model="calculatePaintCost" @update:modelValue="handleOnUpdatePaintCost"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8"></v-col>
          <v-col cols="4">
            <v-text-field label="Ajustement du coût total" v-model="internalPiece.adjustment"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8"></v-col>
          <v-col cols="4">
            <v-text-field label="Sous-total" readonly v-model="calculateSubTotalCost"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8"></v-col>
          <v-col cols="4">
            <v-text-field label="Coût de nettoyage et de maintenance" readonly v-model="calculateCleaningAndMaintenanceCost"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8"></v-col>
          <v-col cols="4">
            <v-text-field label="Coût total de la pièce" readonly v-model="calculateTotalCost"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn @click="close()">Annuler</v-btn>
        <v-btn @click="save()">Sauvegarder</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { MATERIALS } from '~/lib/constants';
import Piece from '~/lib/models/Piece';

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  piece: {
    type: Piece,
    default: new Piece,
  }
})

const emit = defineEmits(['save', 'close'])
const internalPiece = reactive(toRef(props, 'piece'));
const materials = ref(MATERIALS);
const internalValue = toRef(props, 'value');
const materialCost = ref(0.00);
const sandingCostReadonly = ref(true);
const paintCostReadonly= ref(true);

const save = () => {
  emit('save', internalPiece.value);
}

const close = () => {
  emit('close');
}

const calculateMaterialCost = computed({
  get() {
    const piece = internalPiece.value;
    return piece.getMaterialCost();
  },
  set(newValue) {
    materialCost.value = newValue;
  }
})

const calculateCutCost = computed({
  get() {
    const piece = internalPiece.value;
    return piece.getCutCost();
  },
  set(newValue) {
    //
  }
})

const calculateSandingCost = computed({
  get() {
    const piece = internalPiece.value;
    return piece.getSandingCost();
  },
  set(newValue) {
    const piece = internalPiece.value;
    piece.setSandingCost(newValue);
  }
})

const calculatePaintCost = computed({
  get() {
    const piece = internalPiece.value;
    return piece.getPaintCost();
  },
  set(newValue) {
    const piece = internalPiece.value;
    piece.setPaintCost(newValue);
  }
})

const calculateCleaningAndMaintenanceCost = computed({
  get() {
    const piece = internalPiece.value;
    return piece.getCleaningAndMaintenanceCost()
  },
  set(newValue) {
  }
})

const calculateSubTotalCost = computed({
  get() {
    const piece = internalPiece.value;
    return piece.getSubTotalCost();
  },
  set(newValue) {
  }
})

const calculateTotalCost = computed({
  get() {
    const piece = internalPiece.value;
    return piece.getTotalCost();
  },
  set(newValue) {
  }
})

const handleOnUpdateBaseSandingTimeOnCutTime = (newValue) => {
  const piece = internalPiece.value;
  sandingCostReadonly.value = newValue;
  piece.setBaseSandingCostOnCutTime(newValue);
}

const handleOnUpdateBasePaintCostOnMaterialArea = (newValue) => {
  const piece = internalPiece.value;
  paintCostReadonly.value = newValue;
  piece.setBasePaintCostOnMaterialArea(newValue);
}

const handleOnUpdateSandingCost = (newValue) => {
  const piece = internalPiece.value;
  piece.setSandingCost(newValue);
}

const handleOnUpdatePaintCost = (newValue) => {
  const piece = internalPiece.value;
  piece.setPaintCost(newValue);
}
</script>
