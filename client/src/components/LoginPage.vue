<template>
  <div class="flex items-center justify-center flex-col h-[88%]">
    <div
      class="signIn-form flex flex-col items-center justify-evenly rounded-3xl h-2/3 w-1/3 border-2 border-neutral-700"
    >
      <h1 class="text-4xl text-white font-bold">Sign In</h1>
      <input
        v-model="email"
        class="outline-none p-3 rounded-3xl pl-5 bg-transparent border border-gray-400 text-white w-2/3"
        type="text"
        placeholder="Email"
      />
      <input
        v-model="password"
        class="outline-none p-3 rounded-3xl pl-5 bg-transparent border border-gray-400 text-white w-2/3"
        type="password"
        placeholder="Password"
      />
      <button @click="loginUser" class="text-white font-semibold text-xl pt-4">
        SignIn
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import router from "../router/index";

const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      username
      email
      password
      token
    }
  }
`;

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const { mutate: login } = useMutation(LOGIN_USER);

    const loginUser = async () => {
      try {
        const { data } = await login({
          loginInput: {
            email: email.value,
            password: password.value,
          },
        });
        console.log(data.loginUser, "login_user_data");
        localStorage.setItem("token", data.loginUser.token);
        router.push({ name: "home" });
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    return {
      email,
      password,
      loginUser,
    };
  },
};
</script>

<style scoped>
.signIn-form {
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
