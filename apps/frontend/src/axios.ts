import axios, {
  AxiosError,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';
import router from './router';
import { useAuthStore } from './store/auth';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/',
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const store = useAuthStore();

  if (store.isLoggedIn) {
    config.headers.Authorization = `Bearer ${store.token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.status === HttpStatusCode.Unauthorized) {
      router.push('/logout');
    } else {
      throw error;
    }
  },
);
