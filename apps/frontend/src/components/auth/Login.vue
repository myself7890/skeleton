<template>
  <v-sheet width="300" class="mx-auto mt-16">
    <v-form @submit.prevent>
      <v-text-field
        v-model="form.email"
        label="E-mail"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" color="primary" @click="submit"
        >Login</v-btn
      >
      <p class="text-body text-center mt-2" color="secondary">
        <router-link to="/forgotpassword">Forgot password</router-link>
      </p>
      <p class="text-body text-center mt-2" color="secondary">
        <router-link to="/signup">No account? Sign up here</router-link>
      </p>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { AuthForm } from '@/interfaces/auth';
import { useAuth } from '@/composables/auth/useAuth';
import { ref } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { login } = useAuth();
    const form = ref<AuthForm>({
      email: '',
      password: '',
    });

    const submit = async () => {
      await login(form.value);
    };

    return {
      form,
      submit,
    };
  },
});
</script>
