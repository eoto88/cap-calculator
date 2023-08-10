export default class Project {
  constructor(projectData = {}) {
    this.title = projectData.title || '';
    this.client = projectData.client || '';
    this.deadline = projectData.deadline || '';
    this.pieces = projectData.pieces || [];
    this.totalCost = projectData.totalCost || 0.0;
  }

  deletePiece(piece) {
    let index = 0;
    this.pieces.map((p, i) => {
      if (p.id === piece.id) {
        index = i;
      }
    });
    this.pieces.splice(index, 1);
  }

  getTotalCost() {
    let total = 0.00;
    if (this.pieces.length > 0) {
      this.pieces.map((p) => {
        total += Number(p.totalCost) || 0.00;
      })
    }
    this.totalCost = total.toFixed(2);
    return this.totalCost;
  }

  toObject() {
    return {
      title: this.title,
      client: this.client,
      deadline: this.deadline,
      pieces: this.pieces,
      totalCost: this.totalCost,
    };
  }
}
