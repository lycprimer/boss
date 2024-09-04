// import './assets/main.css'
// import { createApp } from 'vue'
// import App from './App.vue'
// createApp(App).mount('#app')


// import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue'; // 引入Antd

const app = createApp(App);

app.use(Antd);

app.mount('#app');
