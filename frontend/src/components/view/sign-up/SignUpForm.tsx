import { useForm } from 'react-hook-form';
import {
  CreateUserRequestBody,
  CreateUserResponseBody,
  Email,
} from '../../../api/user/type';
import AuthForm from '../../ui/auth/AuthForm';
import InputLabel from '../../ui/InputLabel';
import Input from '../../ui/Input';
import { AUTH_VALIDATION_RULES } from '../../../constants/authValidatationRules';
import InputErrorMessage from '../../ui/InputErrorMessage';
import AuthButtonContainer from '../../ui/auth/AuthButtonContainer';
import AuthButton from '../../ui/auth/AuthButton';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { requestCreateUser } from '../../../api/user';
import { queryKey } from '../../../api/user/queryKey';

type FormInput = {
  email: Email;
};

export default function SignUpForm() {
  const queryClient = useQueryClient();
  const createUserMutation = useMutation<
    AxiosResponse<CreateUserResponseBody>,
    AxiosError,
    CreateUserRequestBody
  >({
    mutationFn: (body) => requestCreateUser(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.signup() });
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

  const signUp = async (values: FormInput) => {
    createUserMutation.mutate(values, {
      onSuccess: (data) => {
        console.log('[회원가입 성공]', data);
        navigate({ to: '/auth/sign-in' });
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
    <AuthForm onSubmit={handleSubmit(signUp)}>
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
        <AuthButton disabled={emailError}>회원가입</AuthButton>
      </AuthButtonContainer>
    </AuthForm>
  );
}
