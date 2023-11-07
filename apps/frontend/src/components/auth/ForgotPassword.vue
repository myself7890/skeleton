<template>
  <v-sheet width="300" class="mx-auto mt-16">
    <v-form v-if="!linkSent" @submit.prevent>
      <v-text-field
        v-model="form.email"
        label="E-mail"
        type="email"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" color="primary" @click="submit"
        >Send me a link</v-btn
      >
    </v-form>
    <template v-else>
      <p class="text-body text-center">
        Link have been sent to {{ form.email }}.
      </p>
      <p class="text-body text-center">
        <router-link to="/login">Back to Login</router-link>
      </p>
    </template>
  </v-sheet>
</template>

<script lang="ts">
import { useAuth } from '@/composables/auth/useAuth';
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { ForgotPasswordForm } from '@/interfaces/auth/forgotPasswordForm';

export default defineComponent({
  setup() {
    const linkSent = ref(false);
    const { forgotPassword } = useAuth();
    const form = ref<ForgotPasswordForm>({
      email: '',
    });

    const submit = async () => {
      if (await forgotPassword(form.value)) {
        linkSent.value = true;
      }
    };

    return {
      form,
      submit,
      linkSent,
    };
  },
});
</script>
