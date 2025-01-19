import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '../queryKey';
import { createUser } from '..';
import { CreateUserRequestBody, CreateUserResponseBody } from '../type';
import { AxiosError, AxiosResponse } from 'axios';

export default function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<CreateUserResponseBody>,
    AxiosError,
    CreateUserRequestBody
  >({
    mutationFn: (body) => createUser(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.signup() });
    },
  });
}
