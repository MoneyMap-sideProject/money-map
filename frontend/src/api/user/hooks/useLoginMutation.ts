import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '../queryKey';
import { login } from '..';
import { AxiosError, AxiosResponse } from 'axios';
import { LoginReponseBody, LoginRequestBody } from '../type';

export default function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<LoginReponseBody>,
    AxiosError,
    LoginRequestBody
  >({
    mutationFn: (body) => login(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.signin() });
    },
    onError: (error) => {
      // TODO: 에러 처리
      console.error(error);
    },
  });
}
