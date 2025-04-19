import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { queryKey } from '@/shared/api/user/queryKey';
import { logout } from '@/shared/api/user';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';
import Icon from '@/shared/ui/Icon';

export default function LogoutButton() {
  const { refetch } = useQuery({
    queryKey: queryKey.login(),
    queryFn: logout,
    enabled: false,
  });
  const navigate = useNavigate();

  const _logout = async () => {
    try {
      const result = await refetch();
      if (result.isSuccess === true) {
        navigate({ to: '/auth/login', replace: true });
      }
    } catch (error) {
      console.error(error);
      toast('로그아웃에 실패했습니다.');
    }
  };

  return (
    <Button type="button" onClick={_logout}>
      <Icon type="out" width="20px" height="20px" />
      로그아웃
    </Button>
  );
}

const Button = styled.button`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${(props) => props.theme.colors.grayDark};
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
