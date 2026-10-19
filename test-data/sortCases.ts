import { products } from './users';

// P02: sort by name
export const nameSorts = [
  {
    id: 'P02a',
    option: 'Name (A to Z)',
    expected: [
      products.backpack,
      products.bikeLight,
      products.boltShirt,
      products.fleeceJacket,
      products.onesie,
      products.redShirt,
    ],
  },
  {
    id: 'P02b',
    option: 'Name (Z to A)',
    expected: [
      products.redShirt,
      products.onesie,
      products.fleeceJacket,
      products.boltShirt,
      products.bikeLight,
      products.backpack,
    ],
  },
];

// P03: sort by price
export const priceSorts = [
  {
    id: 'P03a',
    option: 'Price (low to high)',
    expected: [7.99, 9.99, 15.99, 15.99, 29.99, 49.99],
  },
  {
    id: 'P03b',
    option: 'Price (high to low)',
    expected: [49.99, 29.99, 15.99, 15.99, 9.99, 7.99],
  },
];
