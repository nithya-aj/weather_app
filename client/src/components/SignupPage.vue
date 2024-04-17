<template>
  <div class="flex items-center justify-center flex-col h-[88%]">
    <div
      class="signUp-form flex flex-col items-center justify-evenly rounded-3xl h-2/3 w-1/3 border-2 border-neutral-700"
    >
      <h1 class="text-4xl text-white font-bold">Sign Up</h1>
      <input
        v-model="username"
        class="placeholder-white outline-none p-3 rounded-3xl pl-5 bg-transparent border border-gray-400 text-white w-2/3"
        type="text"
        placeholder="Username"
      />
      <input
        v-model="email"
        class="placeholder-white outline-none p-3 rounded-3xl pl-5 bg-transparent border border-gray-400 text-white w-2/3"
        type="text"
        placeholder="Email"
      />
      <input
        v-model="password"
        class="placeholder-white outline-none p-3 rounded-3xl pl-5 bg-transparent border border-gray-400 text-white w-2/3"
        type="password"
        placeholder="Password"
      />
      <button
        @click="registerUser"
        class="text-white font-semibold text-xl pt-4"
      >
        SignUp
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import router from "../router/index";
import { useAuthService } from "../context/authService";

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput!) {
    registerUser(registerInput: $registerInput) {
      username
      email
      password
      token
    }
  }
`;

export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");

    const { mutate: register } = useMutation(REGISTER_USER);
    const authService = useAuthService();

    const registerUser = async () => {
      try {
        const { data } = await register({
          registerInput: {
            username: username.value,
            email: email.value,
            password: password.value,
          },
        });
        console.log(data.registerUser); 
        username.value = "";
        email.value = "";
        password.value = "";
        authService.authService.login(data.registerUser.token);
        localStorage.setItem("username", data.registerUser.username);
        router.push({ name: "home" });
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

    return {
      username,
      email,
      password,
      registerUser,
    };
  },
};
</script>

<style scoped>
.signUp-form {
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
