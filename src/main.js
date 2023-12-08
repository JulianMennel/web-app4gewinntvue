import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import NavbarSmall from './components/NavbarSmall.vue';
import Navbar from "./components/Navbar.vue"

const app = createApp(App)
app.component('NavbarSmall', NavbarSmall);
app.component('Navbar', Navbar);

app.use(router)

app.mount('#app')
