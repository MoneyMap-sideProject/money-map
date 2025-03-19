import { useForm } from 'react-hook-form';
import {
  Email,
  LoginResponseBody,
  LoginRequestBody,
} from '../../../api/user/type';
import { useNavigate } from '@tanstack/react-router';
import AuthForm from '../../ui/auth/AuthForm';
import InputLabel from '../../ui/InputLabel';
import Input from '../../ui/Input';
import { AUTH_VALIDATION_RULES } from '../../../constants/authValidatationRules';
import InputErrorMessage from '../../ui/InputErrorMessage';
import AuthButtonContainer from '../../ui/auth/AuthButtonContainer';
import AuthButton from '../../ui/auth/AuthButton';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { queryKey } from '../../../api/user/queryKey';
import { requestLogin } from '../../../api/user';

type FormInput = {
  email: Email;
};

export default function LoginForm() {
  const queryClient = useQueryClient();
  const loginMutation = useMutation<
    AxiosResponse<LoginResponseBody>,
    AxiosError,
    LoginRequestBody
  >({
    mutationFn: (body) => requestLogin(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.signin() });
    },
    onError: (error) => {
      // TODO: 에러 처리
      console.error(error);
    },
  });

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
  const navigate = useNavigate();

  const login = async (values: FormInput) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate({ to: '/' });
        toast('로그인 성공!', {
          autoClose: 1500,
        });
      },
      onError: (error) => {
        console.error(error);
        toast('로그인에 실패했습니다.', {
          autoClose: 1500,
        });
        // TODO: 에러 처리
      },
    });
  };

  return (
    <AuthForm onSubmit={handleSubmit(login)}>
      <InputLabel htmlFor="email">이메일</InputLabel>
      <Input
        type="email"
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
        <AuthButton disabled={emailError}>로그인</AuthButton>
      </AuthButtonContainer>
    </AuthForm>
  );
}
