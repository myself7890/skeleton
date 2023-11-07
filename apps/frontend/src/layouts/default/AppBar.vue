<template>
  <v-app-bar :elevation="2" color="primary">
    <v-app-bar-title>Team Sync Pro</v-app-bar-title>
    <template v-slot:append>
      <v-btn
        v-if="!store.isLoggedIn"
        icon="mdi-login"
        @click="router.push('/login')"
      ></v-btn>
      <template v-else>
        <v-icon icon="mdi-account"></v-icon>
        <v-btn icon="mdi-logout" @click="router.push('/logout')"></v-btn>
      </template>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import router from '@/router';
import { useAuthStore } from '@/store/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const store = useAuthStore();

    return { store, router };
  },
});
</script>

<style lang="scss">
.v-toolbar {
  margin-bottom: 25px;
}
</style>
