import { standardUser, password } from './users';

// L03 to L05: invalid login combinations
export const invalidLogins = [
  {
    id: 'L03',
    title: 'wrong password shows the do not match error',
    tag: '@smoke',
    username: standardUser,
    password: 'wrong_password',
    error: 'Username and password do not match any user in this service',
  },
  {
    id: 'L04',
    title: 'empty username shows Username is required',
    tag: '@regression',
    username: '',
    password: password,
    error: 'Username is required',
  },
  {
    id: 'L05',
    title: 'empty password shows Password is required',
    tag: '@regression',
    username: standardUser,
    password: '',
    error: 'Password is required',
  },
];
