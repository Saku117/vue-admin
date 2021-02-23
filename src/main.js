import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);

app.use(ELementPlus)
app.use(store);
app.use(router);
app.mount("#app")


