<!-- Weather.vue -->
<template>
  <div class="container mx-auto">
    <form class="max-w-md mx-auto">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" v-model="parameters.q"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Seach: Madrid, London, Casablanca..." required />
        <button type="button" @click="getWeather()"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </button>
      </div>
    </form>

    <h1 class="text-2xl font-semibold my-4">
      Current Weather
    </h1>
    <div v-if="!isLoading">
      <div class="grid grid-cols-2 gap-4 mt-14">
        <div>
          <h2 class="text-xl font-semibold mb-2">
            {{
              weather_data.location && weather_data.location.name
              ? weather_data.location.name + ","
              : ""
            }}
            <span class="text-gray-500">{{
              weather_data.location && weather_data.location.region
              ? weather_data.location.region + ","
              : ""
            }}
              {{ weather_data.location?.country }}</span>
          </h2>

          <div class="flex items-center gap-6">
            <img :src="weather_data.current?.condition.icon" alt="Weather icon" class="w-16 h-16" />
            <p class="text-xl font-semibold">
              {{ weather_data.current?.temp_c }}°C
            </p>
            <p class="text-gray-500">
              {{ weather_data.current?.condition.text }}
            </p>
          </div>
        </div>
      </div>
      <div class="table w-full max-w-screen-md my-5">
        <div class="table-row my-4">
          <p class="table-cell font-semibold text-md text-gray-900">
            Feels like:
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.current?.feelslike_c }}°C
          </p>
          <p class="table-cell font-semibold text-md text-gray-900">Wind:</p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.current?.wind_kph }} km/h
            {{ weather_data.current?.wind_dir }}
          </p>
        </div>
        <div class="table-row my-4">
          <p class="table-cell font-semibold text-md text-gray-900">
            Humidity:
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.current?.humidity }}%
          </p>
          <p class="table-cell font-semibold text-md text-gray-900">
            Visibility:
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.current?.vis_km }} km
          </p>
        </div>
        <div class="table-row my-4">
          <p class="table-cell font-semibold text-md text-gray-900">
            UV Index:
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.current?.uv }}
          </p>
        </div>
      </div>
      <h2 class="text-xl font-semibold my-8">Tomorrow</h2>
      <div class="flex items-center gap-12">
        <img :src="weather_data.forecast?.forecastday[1].day.condition.icon" alt="Weather icon" class="w-16 h-16" />
        <p class="text-xl font-semibold relative">
          {{ weather_data.forecast?.forecastday[1].day.mintemp_c }}°C <span class="text-sm font-normal absolute top-0 -right-7 text-gray-500">min</span> 
         </p>
        <p class="text-xl font-semibold relative"> 
          {{ weather_data.forecast?.forecastday[1].day.maxtemp_c }}°C <span class="text-sm font-normal absolute top-0 -right-7 text-gray-500">max</span>
        </p>
        <p class="text-gray-500">
          {{ weather_data.forecast?.forecastday[1].day.condition.text }}
        </p>
      </div>
      <div class="table w-full max-w-screen-md my-5">
        <div class="table-row">
          <p class="table-cell font-semibold text-md text-gray-900">
            Average Temperature
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.forecast?.forecastday[1].day.avgtemp_c }}°C ({{
              weather_data.forecast?.forecastday[1].day.avgtemp_f
            }}°F)
          </p>

          <p class="table-cell font-semibold text-md text-gray-900">Max Wind</p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.forecast?.forecastday[1].day.maxwind_kph }} km/h ({{
              weather_data.forecast?.forecastday[1].day.maxwind_mph
            }}
            mph)
          </p>
        </div>
        <div class="table-row">
          <p class="table-cell font-semibold text-md text-gray-900">
            Total Precipitation
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.forecast?.forecastday[1].day.totalprecip_mm }} mm
            ({{
              weather_data.forecast?.forecastday[1].day.totalprecip_in
            }}
            inches)
          </p>

          <p class="table-cell font-semibold text-md text-gray-900">
            Average Visibility
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.forecast?.forecastday[1].day.avgvis_km }} km ({{
              weather_data.forecast?.forecastday[1].day.avgvis_miles
            }}
            miles)
          </p>
        </div>
        <div class="table-row"></div>
        <div class="table-row">
          <p class="table-cell font-semibold text-md text-gray-900">
            Average Humidity
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.forecast?.forecastday[1].day.avghumidity }}%
          </p>
          <p class="table-cell font-semibold text-md text-gray-900">UV Index</p>
          <p class="text-sm font-extralight text-gray-500">
            {{ weather_data.forecast?.forecastday[1].day.uv }}
          </p>
        </div>
        <div class="table-row">
          <p class="table-cell font-semibold text-md text-gray-900">
            Chance of Rain
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{
              weather_data.forecast?.forecastday[1].day.daily_chance_of_rain
            }}%
          </p>
          <p class="table-cell font-semibold text-md text-gray-900">
            Chance of Snow
          </p>
          <p class="text-sm font-extralight text-gray-500">
            {{
              weather_data.forecast?.forecastday[1].day.daily_chance_of_snow
            }}%
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-700 font-normal">is loading ...</p>
    </div>
  </div>
</template>

<script setup>
// import router from '@/routes';
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";
import router from "@/routes";
import axios from "axios";
const userStore = useUserStore();
const weather_data = ref({});
const isLoading = ref(false);
const parameters = ref({
  key: process.env.VUE_APP_WEATHER_API_KEY,
  q: "",
  country: "Morocco",
  aqi: "no",
  lang: "ar",
  days: "2",
});
const getLocation = async () => {
  isLoading.value = true;
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = await position.coords;

      parameters.value.q = latitude + "," + longitude || "London";
      await getWeather();
      isLoading.value = false;
      parameters.value.q="";
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

const getWeather = async () => {
  isLoading.value = true;
  axios
    .get("https://api.weatherapi.com/v1/forecast.json", {
      params: parameters.value,
    })
    .then(async (res) => {
      weather_data.value = await res?.data;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response from server:", error.response.status);
        console.error("Error data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up request:", error.message);
      }
    });
};
onMounted(async () => {
  await getLocation();
  await userStore.getUser();
  if (!userStore.isAuth) {
    router.push({ name: "login" });
    console.log("you are log out");
  }
});
</script>
