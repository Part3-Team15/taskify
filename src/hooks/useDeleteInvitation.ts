import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteInvitation } from '@/services/deleteService';
import { CancelInvitationInput } from '@/types/delete/CancelInvitation.interface';

export const useDeleteInvitation = (handleSuccess: () => void) => {
  return useMutation<unknown, unknown, CancelInvitationInput, unknown>({
    mutationFn: deleteInvitation,
    onSuccess: () => {
      handleSuccess();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    },
  });
};
