<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6"
            :class="userInfo.errors.email?'text-red-500':'text-gray-900'"
            >Email address *</label>
            <div class="mt-2">
              <input 
              v-model="userInfo.email" 
              type="email"
              @input="isEmailValid"
              autocomplete="new-password" 
              required 
              class="block w-full rounded-md pl-3 py-1.5 shadow-sm sm:text-sm sm:leading-6" 
              :class="userInfo.errors.email? errorInput:validInput"
              />
            </div>
            <span class="text-red-400 text-sm" v-if="userInfo.errors.email">{{ userInfo.errors.email }}</span>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium leading-6"
            :class="userInfo.errors.password?'text-red-500':'text-gray-900'"
            >Password *</label>
            <div class="mt-2">
              <input 
              v-model="userInfo.password" 
              type="password"
              autocomplete="new-password" 
              required 
              class="block w-full rounded-md pl-3 py-1.5 shadow-sm sm:text-sm sm:leading-6" 
              :class="userInfo.errors.password? errorInput:validInput"
              />
            </div>
            <span class="text-red-400 text-sm" v-if="userInfo.errors.password">{{ userInfo.errors.password }}</span>
          </div>
  
          <div>
            <button type="submit" @click="loginUser" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
          <span class="text-red-400" v-if="userInfo.errors.message">{{ userInfo.errors.message }}</span>

        </div>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          {{ ' ' }}
          <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
        </p>
      </div>
    </div>
  </template>
  <script  setup>
  import router from '@/routes';
  import axiosIn from '@/services/axios';
  import { onMounted, ref } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  const userStore = useUserStore()

  const userInfo = ref({
    email:'',
    password: '',
    errors:{}
  })
  const errorInput = ref('bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500')
  const validInput = ref('text-gray-900 border-0 placeholder:text-gray-400')
  const validateEmail = () => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/;
    return emailRegex.test(userInfo.value.email.trim());
  };

  const isEmailValid = () =>  {
    userInfo.value.errors = {};
    if (userInfo.value.email.trim() === '') {
      userInfo.value.errors.email = 'Please enter an email';
    }
    else {
      if(!validateEmail()) {
        userInfo.value.errors.email = 'Please enter valid email'; 
      }
      else {
        userInfo.value.errors = {};
      }
    }
  }

  const loginUser = async () => {
    userInfo.value.errors = {};
    isEmailValid();
    if (userInfo.value.password.trim() === '') {
      userInfo.value.errors.password = 'Please enter a password';
    }

    // If there are no errors, proceed with login
    if (Object.keys(userInfo.value.errors).length === 0) {
    try {
       
            await axiosIn.post('/login', userInfo.value).then(() => {
              router.push({name: 'home'});
            })
    }
    catch(err) {
      
    userInfo.value.errors = {};
      userInfo.value.errors = err.response.data.errors;
    }
    }
  }

  onMounted(async () => {
    await userStore.getUser();
    if(userStore.isAuth) {
      router.push({name: 'home'})
    }
  });
</script>
  