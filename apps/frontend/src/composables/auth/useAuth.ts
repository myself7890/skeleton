import { toast } from 'vue3-toastify';
import { axiosClient } from '@/axios';
import {
  AuthForm,
  AuthProfile,
  ChangePasswordForm,
  SignupForm,
} from '@/interfaces/auth';
import { ForgotPasswordForm } from '@/interfaces/auth/forgotPasswordForm';
import router from '@/router';
import { useAuthStore } from '@/store/auth';
import { useGetErrors } from '../useErrors';

interface UseAuthResponse {
  login: (form: AuthForm) => Promise<void>;
  signup: (form: SignupForm) => Promise<void>;
  forgotPassword: (form: ForgotPasswordForm) => Promise<boolean>;
  validatePasswordLink: (hash: string) => Promise<boolean>;
  changePassword: (form: ChangePasswordForm) => Promise<boolean>;
  logout: () => void;
  getProfile: () => Promise<AuthProfile>;
}

export const useAuth = (): UseAuthResponse => {
  const store = useAuthStore();

  const login = async (form: AuthForm): Promise<void> => {
    try {
      const response = await axiosClient.post('auth/login', form);
      store.setToken(response.data.access_token);
      router.push('/');
    } catch (e) {
      const { toastErrors } = useGetErrors();
      toastErrors(e);
    }
  };

  const signup = async (form: SignupForm): Promise<void> => {
    try {
      const response = await axiosClient.post('auth/signup', form);
      store.setToken(response.data.access_token);
      router.push('/');
    } catch (e) {
      const { toastErrors } = useGetErrors();
      toastErrors(e);
    }
  };

  const logout = () => {
    store.logout();
    router.push('/login');
  };

  const forgotPassword = async (form: ForgotPasswordForm): Promise<boolean> => {
    try {
      await axiosClient.post('auth/forgotpassword', form);
      return true;
    } catch (e) {
      const { toastErrors } = useGetErrors();
      toastErrors(e);
      return false;
    }
  };

  const validatePasswordLink = async (hash: string): Promise<boolean> => {
    try {
      await axiosClient.get(`auth/forgotpassword/validate/${hash}`);

      return true;
    } catch (e) {
      const { toastErrors } = useGetErrors();
      toastErrors(e);

      return false;
    }
  };

  const changePassword = async (form: ChangePasswordForm): Promise<boolean> => {
    try {
      await axiosClient.put('auth/changepassword', form);
      return true;
    } catch (e) {
      const { toastErrors } = useGetErrors();
      toastErrors(e);
      return false;
    }
  };

  const getProfile = async (): Promise<AuthProfile> => {
    if (!store.profile.ID) {
      try {
        const response = await axiosClient.get('auth/profile');
        store.setProfile(response.data);
      } catch (e) {
        router.push('/login');
      }
    }

    return store.profile;
  };
  return {
    login,
    signup,
    forgotPassword,
    validatePasswordLink,
    changePassword,
    logout,
    getProfile,
  };
};
