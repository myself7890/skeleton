<template>
  <v-sheet width="300" class="mx-auto mt-16">
    <v-form v-if="!isPasswordChanged" @submit.prevent>
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
        >Change password</v-btn
      >
    </v-form>
    <template v-else>
      <p class="text-body text-center">Password have been changed</p>
      <p class="text-body text-center">
        <router-link to="/login">Back to Login</router-link>
      </p>
    </template>
  </v-sheet>
</template>

<script lang="ts">
import { ChangePasswordForm } from '@/interfaces/auth';
import { useAuth } from '@/composables/auth/useAuth';
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

export default defineComponent({
  setup() {
    const { validatePasswordLink, changePassword } = useAuth();
    const route = useRoute();

    const isRouteValid = ref(true);
    const isPasswordChanged = ref(false);
    const form = ref<ChangePasswordForm>({
      password: '',
      passwordValidation: '',
      hash: route.params.hash as string,
    });

    onMounted(async () => {
      isRouteValid.value = await validatePasswordLink(
        route.params.hash as string,
      );
    });

    const submit = async () => {
      if (await changePassword(form.value)) {
        isPasswordChanged.value = true;
      }
    };

    return {
      form,
      submit,
      isPasswordChanged,
    };
  },
});
</script>
