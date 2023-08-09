import { CNC_PRICE, MATERIALS, PAINT_PRICE, SANDING_PRICE } from '~/lib/constants';
export default class Piece {

  constructor(pieceData = {}) {
    this.id = pieceData.id;
    this.adjustment = pieceData.adjustment || 0;
    this.title = pieceData.title || '';
    this.material = pieceData.material || '';
    this.height = pieceData.height || 0;
    this.width = pieceData.width || 0;
    this.materialCost = Number(pieceData.materialCost) || 0.0;
    this.cncPrice = pieceData.cncPrice || CNC_PRICE;
    this.cutTime = pieceData.cutTime || 0;
    this.cutCost = pieceData.cutCost || 0.0;
    this.sandingPrice = pieceData.sandingPrice || SANDING_PRICE;
    this.baseSandingCostOnCutTime = pieceData.baseSandingCostOnCutTime || true;
    this.sandingCost = pieceData.sandingCost || 0.0;
    this.paintPrice = pieceData.paintPrice || PAINT_PRICE;
    this.basePaintCostOnMaterialArea = pieceData.basePaintCostOnMaterialArea || true;
    this.paintCost = pieceData.paintCost || 0.0;
    this.subTotalCost = pieceData.subTotalCost || 0.0;
    this.cleaningAndMaintenanceCost = pieceData.cleaningAndMaintenanceCost || 0.0;
    this.totalCost = pieceData.totalCost || 0.0;
  }

  getAdjustment() {
    return this.adjustment;
  }

  setAdjustement(newValue) {
    this.adjustment = newValue;
  }

  getMaterialCost() {
    if (this.material) {
      const selectedMaterial = MATERIALS.find(o => o.id === this.material);
      this.materialCost = Number(this.height * this.width * selectedMaterial.price).toFixed(2);
    }
    return this.materialCost;
  }

  getCutCost() {
    this.cutCost = (this.cutTime * this.cncPrice).toFixed(2);
    return this.cutCost;
  }

  getSandingCost() {
    if (this.baseSandingCostOnCutTime) {
      this.sandingCost = (this.cutTime * SANDING_PRICE).toFixed(2);
    }
    return this.sandingCost;
  }

  setSandingCost(newSandingCost) {
    this.sandingCost = Number(newSandingCost).toFixed(2);
  }

  setBaseSandingCostOnCutTime(newValue) {
    this.baseSandingCostOnCutTime = newValue;
  }

  setBasePaintCostOnMaterialArea(newValue) {
    this.basePaintCostOnMaterialArea = newValue;
  }

  getPaintCost() {
    if (this.basePaintCostOnMaterialArea) {
      this.paintCost = ((this.height * this.width) * PAINT_PRICE).toFixed(2);
    }
    return this.paintCost;
  }

  setPaintCost(newPaintCost) {
    this.paintCost = Number(newPaintCost).toFixed(2);
  }

  getSubTotalCost() {
    this.subTotalCost = (
      Number(this.materialCost) +
      Number(this.cutCost) +
      Number(this.sandingCost) +
      Number(this.paintCost) +
      (Number(this.adjustment))
    ).toFixed(2);
    return this.subTotalCost;
  }

  getCleaningAndMaintenanceCost() {
    return (this.subTotalCost / 10).toFixed(2);
  }

  getTotalCost() {
    this.totalCost = (
      Number(this.subTotalCost) +
      Number(this.getCleaningAndMaintenanceCost())
    ).toFixed(2);
    return this.totalCost;
  }
}
