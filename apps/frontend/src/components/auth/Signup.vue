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
      <v-text-field
        v-model="form.passwordValidation"
        label="Password validation"
        type="password"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" color="primary" @click="submit"
        >Sign up</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { SignupForm } from '@/interfaces/auth';
import { useAuth } from '@/composables/auth/useAuth';
import { ref } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { signup } = useAuth();
    const form = ref<SignupForm>({
      email: '',
      password: '',
      passwordValidation: '',
    });

    const submit = () => {
      signup(form.value);
    };

    return {
      form,
      submit,
    };
  },
});
</script>
