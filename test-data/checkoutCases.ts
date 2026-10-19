import { checkoutInfo } from './users';

// K02: checkout form validation
export const checkoutFormCases = [
  {
    id: 'K02a',
    title: 'missing first name shows the right error',
    firstName: '',
    lastName: checkoutInfo.lastName,
    postcode: checkoutInfo.postcode,
    error: 'First Name is required',
  },
  {
    id: 'K02b',
    title: 'missing last name shows the right error',
    firstName: checkoutInfo.firstName,
    lastName: '',
    postcode: checkoutInfo.postcode,
    error: 'Last Name is required',
  },
  {
    id: 'K02c',
    title: 'missing postcode shows the right error',
    firstName: checkoutInfo.firstName,
    lastName: checkoutInfo.lastName,
    postcode: '',
    error: 'Postal Code is required',
  },
];
