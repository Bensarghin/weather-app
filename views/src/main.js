import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import routes from './routes'
import './assets/style.css';
const app = createApp(App);

// Use Pinia
app.use(createPinia());
app.use(routes);

app.mount('#app');
