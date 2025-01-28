import { useForm } from 'react-hook-form';
import { Email } from '../../../api/user/type';
import AuthForm from '../../ui/auth/AuthForm';
import InputLabel from '../../ui/InputLabel';
import Input from '../../ui/Input';
import { VALIDATION_RULES } from '../../../constants/validatationRules';
import InputErrorMessage from '../../ui/InputErrorMessage';
import AuthButtonContainer from '../../ui/auth/AuthButtonContainer';
import AuthButton from '../../ui/auth/AuthButton';
import { useNavigate } from '@tanstack/react-router';
import useCreateUserMutation from '../../../api/user/hooks/useCreateUserMutation';
import { toast } from 'react-toastify';

type FormInput = {
  email: Email;
};

export default function SignUpForm() {
  const navigate = useNavigate();
  const createUserMutation = useCreateUserMutation();
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

  const _handleSubmit = async (values: FormInput) => {
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
    <AuthForm onSubmit={handleSubmit(_handleSubmit)}>
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
            value: VALIDATION_RULES.emial,
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
