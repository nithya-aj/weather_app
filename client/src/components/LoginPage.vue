<template>
  <div class="flex items-center justify-center flex-col h-[88%]">
    <div
      class="signIn-form flex flex-col items-center justify-evenly rounded-3xl h-2/3 w-1/3 border-2 border-neutral-700 "
    >
      <h1 class="text-4xl text-white font-bold">Sign In</h1>
      <input
        class="outline-none p-3 rounded-3xl pl-5 bg-transparent border border-gray-400 text-white w-2/3"
        type="text"
        placeholder="Email"
      />
      <input
        class="outline-none p-3 rounded-3xl pl-5 bg-transparent border border-gray-400 text-white w-2/3"
        type="password"
        placeholder="Password"
      />
      <button class="text-white font-semibold text-xl pt-4">SignIn</button>
    </div>
  </div>
</template>

<style scoped>
.signIn-form {
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
