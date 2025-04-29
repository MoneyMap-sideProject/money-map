import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import {
  SignUpRequestBody,
  SignUpResponseBody,
  Email,
} from '@/shared/api/user/type';
import { signUp } from '@/shared/api/user';
import { queryKey } from '@/shared/api/user/queryKey';
import InputLabel from '@/shared/ui/InputLabel';
import Input from '@/shared/ui/Input';
import InputErrorMessage from '@/shared/ui/InputErrorMessage';
import Button from '@/shared/ui/Button';
import { AUTH_VALIDATION_RULES } from '../auth/constants/validationRules';
import { AuthButtonContainer, AuthForm } from '../auth/ui/Auth';

type FormInput = {
  email: Email;
};

export default function SignUpForm() {
  const queryClient = useQueryClient();
  const signUpMutation = useMutation<
    AxiosResponse<SignUpResponseBody>,
    AxiosError,
    SignUpRequestBody
  >({
    mutationFn: (body) => signUp(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.signUp() });
    },
  });
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormInput>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });
  const emailError = !!errors.email;

  const _signUp = async (values: FormInput) => {
    signUpMutation.mutate(values, {
      onSuccess: (data) => {
        console.log('[회원가입 성공]', data);
        navigate({ to: '/auth/login' });
        toast('회원가입 성공!', {
          autoClose: 1500,
        });
      },
      onError: (error) => {
        console.error(error);
        toast('회원가입에 실패했습니다.', {
          autoClose: 1500,
        });
        // TODO: 에러 처리
      },
    });
  };

  return (
    <AuthForm onSubmit={handleSubmit(_signUp)}>
      <InputLabel htmlFor="email">이메일</InputLabel>
      <Input
        placeholder="sample@sample.com"
        $isError={emailError}
        {...register('email', {
          required: {
            value: true,
            message: '이메일을 입력해주세요.',
          },
          pattern: {
            value: AUTH_VALIDATION_RULES.email,
            message: '이메일 형식으로 입력해주세요.',
          },
        })}
      />
      {emailError && (
        <InputErrorMessage>{errors.email?.message}</InputErrorMessage>
      )}
      <AuthButtonContainer>
        <Button disabled={emailError}>회원가입</Button>
      </AuthButtonContainer>
    </AuthForm>
  );
}
