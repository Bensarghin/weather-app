<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create new account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="registerUser" class="space-y-6">
        <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <input
              v-model="userInfo.name" 
              type="text" 
              autocomplete="name"  
              class="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input
              v-model="userInfo.email" 
              type="email"
              autocomplete="email"  
              class="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <span class="text-red-400" v-if="userInfo.errors.email">{{ userInfo.errors.email }}</span>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input
              v-model="userInfo.password"
              type="password" 
              autocomplete="current-password"  
              class="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <span class="text-red-400" v-if="userInfo.errors.password">{{ userInfo.errors.password }}</span>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
            </div>
            <div class="mt-2">
              <input
              v-model="userInfo.confirm_password"
              type="password" 
              autocomplete="current-password" 
              class="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          You already a member?
          {{ ' ' }}
          <router-link :to="{name: 'login'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Access your account</router-link>
        </p>
      </div>
    </div>
  </template>
  <script  setup>
  import axiosIn from '@/services/axios';
  import { onMounted , ref } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  import router from '@/routes';
  const userStore = useUserStore();

  const userInfo = ref({
    name:'',
    email:'',
    password: '',
    confirm_password: '',
    errors:{},
  })
  const registerUser = async () => {
    try {
        await axiosIn.post('/signup', userInfo.value).then(res => {
        console.log(res);
        if (res.errors) {
          console.log(res.erros);
        }
        if (res.user) {
          // location.assign('/');
          console.log(res.user);
        }
        })
    }
    catch(err) {
      userInfo.value.errors = err.response.data.errors;
    }
  }

  onMounted(async () => {
    await userStore.getUser();
    if(userStore.isAuth) {
      router.push({name: 'home'})
    }
  });
</script>
  