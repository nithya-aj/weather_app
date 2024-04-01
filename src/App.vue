<script setup></script>

<template>
  <div class="h-screen mainDiv">
    <header class="flex justify-end gap-4 p-5 text-white">
      <RouterLink to="/signin" replace>
        <p
          class="p-1 rounded-2xl w-24 flex justify-center signInBtn shadow border-2 border-neutral-700"
        >
          SignIn
        </p>
      </RouterLink>
      <RouterLink to="/signup" replace>
        <p
          class="p-1 rounded-2xl w-24 flex justify-center signInBtn shadow border-2 border-neutral-700"
        >
          SignUp
        </p>
      </RouterLink>
      <!-- <p
        class="p-3 h-10 rounded-full flex items-center justify-center signInBtn shadow cursor-pointer border-2 border-neutral-700"
      >
        <i class="pi pi-search"></i>
      </p>
      <p
        class="p-3 h-10 rounded-3xl flex items-center justify-center signInBtn shadow cursor-pointer text-sm border-2 border-neutral-700"
      >
        Nithya A J
      </p> -->
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.mainDiv {
  background-image: url(./assets/images/sky.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.signInBtn {
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
