import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';

const TOAST_DURATION = 3000;

export const errorToast = (message: string) =>
  toast.error(message, {
    duration: TOAST_DURATION,
    position: ToastPosition.BOTTOM,
  });
