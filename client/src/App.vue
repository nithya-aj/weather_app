<template>
  <div class="h-screen mainDiv">
    <!--if there is no user found -->
    <header
      v-if="!authService.authService.state.isAuthenticated"
      class="flex justify-end gap-4 p-5 text-white"
    >
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
    </header>
    <!-- if user is logged in  -->
    <header v-else class="flex justify-end gap-4 p-4 text-white">
      <p
        class="p-3 h-10 rounded-full gap-3 flex items-center justify-center signInBtn shadow cursor-pointer border-2 border-neutral-700"
      >
        <input type="text" class="bg-transparent outline-none" />
        <i class="pi pi-search"></i>
      </p>
      <p
        @click="logout"
        class="p-3 h-10 rounded-3xl flex items-center justify-center signInBtn shadow cursor-pointer text-sm border-2 border-neutral-700"
      >
        Logout
      </p>
    </header>
    <RouterView />
  </div>
</template>

<script>
import { useAuthService } from "../src/context/authService";
export default {
  setup() {
    const authService = useAuthService();
    const logout = () => {
      authService.authService.logout();
    };
    console.log(authService, "authService");
    return { authService, logout };
  },
};
</script>

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
