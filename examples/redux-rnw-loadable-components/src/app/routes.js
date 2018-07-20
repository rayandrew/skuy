import { Home, Counter, Modal } from './containers';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/counter',
    component: Counter,
  },
  {
    path: '/modal',
    component: Modal,
  },
];
