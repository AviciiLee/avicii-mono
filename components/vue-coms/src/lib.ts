import { App, Plugin } from 'vue';
import Button from './components/Button.vue';

const components = [Button];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export default { install } as Plugin;
