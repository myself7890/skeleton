import { AxiosError } from 'axios';
import { toast } from 'vue3-toastify';

interface UseErrorsResponse {
  toastErrors: (err: any) => void;
}

export const useGetErrors = (): UseErrorsResponse => {
  const toastErrors = (err: any) => {
    const errors = [];
    if (err instanceof AxiosError) {
      if (err.response && Array.isArray(err.response?.data.message)) {
        errors.push(...err.response.data.message);
      } else {
        errors.push(err.response?.data.message);
      }
    }

    errors.map((error) => {
      toast(error, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };
  return {
    toastErrors,
  };
};
