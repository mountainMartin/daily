import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToast = () => {
  const toastSuccess = (message) => {
    toast.success(message ?? 'success', {
      position: 'bottom-right',
    });
  };

  const toastError = (message) => {
    toast.error(message ?? 'error', {
      position: 'top-right',
    });
  };

  const toastWarning = (message) => {
    toast.warning(message ?? 'warning', {
      position: 'top-center',
    });
  };

  const toastInfo = (message) => {
    toast.info(message ?? 'info', {
      position: 'bottom-left',
    });
  };

  return { toastSuccess, toastError, toastWarning, toastInfo };
};
