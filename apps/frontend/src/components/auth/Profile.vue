<template>Email: {{ profile.email }}</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuth } from '@/composables/auth/useAuth';

export default defineComponent({
  async setup() {
    const { getProfile } = useAuth();
    const profile = await getProfile();

    return {
      profile,
    };
  },
});
</script>
