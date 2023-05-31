import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';

import router from './providers/withRouter';
import store from './providers/withStore';

const app = createApp(App).use(store).use(router);

export default app;
