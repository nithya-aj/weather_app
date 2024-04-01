<script setup>
</script>

<template>
  <div class="h-[89vh] pb-8 px-8 flex text-white gap-5">
    <div
      class="innerDiv w-1/4 h-full rounded-xl text-white flex flex-col items-center p-3 border-2 border-neutral-700"
    >
      <p>Saved Places</p>
    </div>
    <div class="flex flex-col gap-8 w-full">
      <div class="flex gap-5 items-center">
        <i class="pi pi-map-marker pt-2"></i>
        <p class="text-3xl">Arattupuzha</p>
        <p class="text-2xl text-neutral-300">( Wed, March 21 )</p>
      </div>
      <p class="text-7xl ml-6">18°</p>
      <p class="text-6xl pt-2 ml-6 text-neutral-400">
        Stormy <br />
        with partial clouds
      </p>
      <div class="flex justify-between pt-4 ml-6 pr-6 h-full">
        <div class="flex flex-col items-center justify-between">
          <p>Monday</p>
          <p class="border border-white h-2/3 border-dashed opacity-25"></p>
          <p class="text-3xl opacity-50">32°</p>
        </div>
        <div class="flex flex-col items-center justify-between">
          <p>Tuesday</p>
          <p class="border border-white h-2/3 border-dashed opacity-25"></p>
          <p class="text-3xl opacity-50">32°</p>
        </div>
        <div class="flex flex-col items-center justify-between">
          <p>Wednesday</p>
          <p class="border border-white h-2/3 border-dashed opacity-25"></p>
          <p class="text-3xl opacity-50">32°</p>
        </div>
        <div class="flex flex-col items-center justify-between">
          <p>Thursday</p>
          <p class="border border-white h-2/3 border-dashed opacity-100"></p>
          <p class="text-3xl opacity-100">32°</p>
        </div>
        <div class="flex flex-col items-center justify-between">
          <p>Friday</p>
          <p class="border border-white h-2/3 border-dashed opacity-25"></p>
          <p class="text-3xl opacity-50">32°</p>
        </div>
        <div class="flex flex-col items-center justify-between">
          <p>Saturday</p>
          <p class="border border-white h-2/3 border-dashed opacity-25"></p>
          <p class="text-3xl opacity-50">32°</p>
        </div>
        <div class="flex flex-col items-center justify-between">
          <p>Sunday</p>
          <p class="border border-white h-2/3 border-dashed opacity-25"></p>
          <p class="text-3xl opacity-50">32°</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.innerDiv {
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
i {
  font-size: 1.5rem;
}
</style>
