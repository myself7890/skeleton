<template>Redirecting to login</template>

<script lang="ts">
import { useAuth } from '@/composables/auth/useAuth';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { logout } = useAuth();
    logout();
  },
});
</script>
