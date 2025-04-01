import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { routeTree } from '@/routeTree.gen';
import NotFound from '@/widgets/NotFound';
import { GetProfileResponseBody } from '@/shared/api/user/type';
import { queryKey } from '@/shared/api/user/queryKey';
import { getProfile } from '@/shared/api/user';

const router = createRouter({
  routeTree,
  context: {
    auth: {
      email: null,
      isLogin: false,
    },
  },
  defaultNotFoundComponent: () => <NotFound />,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function AuthRouterProvider() {
  const { data, isSuccess, isPending } = useQuery<
    AxiosResponse<GetProfileResponseBody>,
    AxiosError
  >({
    queryKey: queryKey.user(),
    queryFn: getProfile,
    retry: 0,
  });

  if (isPending) {
    return <p>사용자 확인 중...</p>;
  }

  const auth = isSuccess
    ? {
        email: data.data.user.email,
        isLogin: true,
      }
    : {
        email: null,
        isLogin: false,
      };

  return <RouterProvider router={router} context={{ auth }} />;
}
