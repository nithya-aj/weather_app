<template>
  <div class="h-[89vh] pb-8 px-8 flex text-white gap-5">
    <div
      class="innerDiv w-1/4 h-full rounded-xl text-white flex flex-col gap-4 items-center p-3 border-2 border-neutral-700 relative"
    >
      <p class="text-xl pb-4">Saved Places</p>
      <div
        class="w-full h-full flex flex-col items-center justify-between pb-10"
      >
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
      <div
        class="innerDiv1 p-2 rounded-bl-xl rounded-br-xl bg-transparent absolute flex items-center justify-center bottom-0 w-full"
      >
        Add New Places
      </div>
    </div>
    <div class="flex flex-col gap-8 w-full">
      <div class="flex gap-5 items-center">
        <i class="pi pi-map-marker pt-2"></i>
        <p class="text-3xl">{{ location }}</p>
        <p class="text-2xl text-neutral-300">({{ currentDate }} )</p>
      </div>
      <p class="text-7xl ml-6">{{ currentTemp }}°</p>
      <p class="text-6xl pt-2 ml-6 text-neutral-400">
        {{ mainWeather }} <br />
        {{ currentWeather }}
      </p>
      <div class="flex justify-between pt-4 ml-6 pr-6 h-full">
        <div
          v-for="forecast in forecastData"
          :key="forecast.date"
          class="flex flex-col items-center justify-between"
        >
          <p>{{ forecast.date }}</p>
          <p class="border border-white h-2/3 border-dashed opacity-25"></p>
          <p class="text-3xl opacity-50">{{ forecast.temp }}°</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
  setup() {
    const location = ref("");
    const currentDate = ref("");
    const currentTemp = ref("");
    const currentWeather = ref("");
    const mainWeather = ref("");
    const forecastData = ref([]);

    onMounted(() => {
      getCurrentLocation();
    });

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const getWeatherData = async (latitude, longitude) => {
      const apiKey = "251b3427c44c68ccefaeb2036fe949de";
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      try {
        // formatting current data
        const currentDateObj = new Date();
        const dayOfWeek = currentDateObj.toLocaleString("en", {
          weekday: "short",
        });
        const monthName = currentDateObj.toLocaleString("en", {
          month: "short",
        });
        const dayOfmonth = currentDateObj.getDate();

        // Fetch current weather data
        const currentResponse = await axios.get(currentUrl);
        const { data: currentData } = currentResponse;

        // Fetch forecast data
        const forecastResponse = await axios.get(forecastUrl);
        const { data: forecastData } = forecastResponse;

        location.value = currentData.name;
        currentDate.value = `${dayOfWeek}, ${monthName} ${dayOfmonth}`;
        currentTemp.value = Math.round(currentData.main.temp);
        currentWeather.value = currentData.weather[0].description;
        mainWeather.value = currentData.weather[0].main;
        parseForecastData(forecastData.list);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const parseForecastData = (forecastList) => {
      forecastData.value = [];
      let lastDate = null;

      for (const forecast of forecastList) {
        const forecastDate = new Date(forecast.dt * 1000);

        if (!lastDate || forecastDate.getDate() !== lastDate.getDate()) {
          forecastData.value.push({
            date: forecastDate.toLocaleString("en", {
              weekday: "long",
            }),
            temp: Math.round(forecast.main.temp),
            weather: forecast.weather[0].description,
          });
          lastDate = forecastDate;
        }
        if (forecastData.value.length === 7) {
          break;
        }
      }
    };

    return {
      location,
      currentTemp,
      currentWeather,
      mainWeather,
      forecastData,
      currentDate,
    };
  },
  components: {
    ListItem,
  },
};
</script>

<style scoped>
.innerDiv {
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(2px);
}
.innerDiv1 {
  background: rgba(0, 0, 0, 0);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(2px);
}
i {
  font-size: 1.5rem;
}
</style>
