import { createApp } from 'vue';
import App from './App.vue';
import Button from './components/Button.vue';

const app = createApp(App);
app.component(Button.name, Button);
app.mount('#app');
