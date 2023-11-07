import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

interface AuthState {
  token?: string;
  ID?: string;
  email?: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useStorage<AuthState>('user', {
      token: undefined,
      ID: undefined,
      email: undefined,
    }),
  }),
  getters: {
    isLoggedIn: (state) => !!state.user.token,
    token: (state) => state.user.token,
    profile: (state) => ({
      ID: state.user.ID,
      email: state.user.email,
    }),
  },
  actions: {
    setToken(token: string) {
      this.user.token = token;
    },
    setProfile(profile: Omit<AuthState, 'token'>) {
      this.user.ID = profile.ID;
      this.user.email = profile.email;
    },
    logout() {
      this.user.token = undefined;
    },
  },
});
