import { createRouter, createWebHistory } from 'vue-router'
import homeComponent from './components/homeComponent';
import loginComponent from './components/auth/loginComponent';
import registerComponent from './components/auth/registerComponent'

const routes = [
  { path: '/', 
    name:'home', 
    component:  homeComponent, 
  },
  { path: '/login', name:'login', component:  loginComponent},
  { path: '/register', name: 'register', component: registerComponent},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router;