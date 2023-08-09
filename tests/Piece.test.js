/* eslint-disable no-undef */

import Piece from '../lib/models/Piece';

const piece = new Piece({
  "id": "b1285179-b387-476a-8649-fd22c4029458",
  "adjustment": 0,
  "title": "Piece 1",
  "material": "MDF12",
  "height": "23",
  "width": "23",
  "materialCost": "26.45",
  "cncPrice": 0.5,
  "cutTime": "21",
  "cutCost": "10.50",
  "sandingPrice": 0.5,
  "baseSandingCostOnCutTime": true,
  "sandingCost": "10.50",
  "paintPrice": 0.1,
  "basePaintCostOnMaterialArea": true,
  "paintCost": "52.90",
  "totalCost": "107.85"
})

test("Piece functions", () => {
  expect(piece.title).toBe('Piece 1');
  expect(piece.material).toBe('MDF12');
  expect(piece.height).toBe('23');
  expect(piece.width).toBe('23');
});

test("Piece functions", () => {
  expect(piece.getMaterialCost()).toBe('26.45');
  expect(piece.getCutCost()).toBe('10.50');
  expect(piece.getSandingCost()).toBe('10.50');
  expect(piece.getPaintCost()).toBe('52.90');
  expect(piece.getTotalCost()).toBe('107.85');
});

test("Piece custom", () => {
  piece.setBaseSandingCostOnCutTime(false);
  piece.setSandingCost(15.00);
  piece.setBasePaintCostOnMaterialArea(false);
  piece.setPaintCost(60.00);
  expect(piece.getMaterialCost()).toBe('26.45');
  expect(piece.getCutCost()).toBe('10.50');
  expect(piece.getSandingCost()).toBe('15.00');
  expect(piece.getPaintCost()).toBe('60.00');
  expect(piece.getTotalCost()).toBe('119.45');
});

test("Piece adjustment", () => {
  piece.setAdjustement(-25.00);
  expect(piece.getTotalCost()).toBe('94.45');
  piece.setAdjustement(25.00);
  expect(piece.getTotalCost()).toBe('144.45');
});
