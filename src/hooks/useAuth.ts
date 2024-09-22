import { useQuery } from '@tanstack/react-query';
import { auth } from '../services/auth/auth';

export const useAuth = () => {
	const { error, data, isFetching, isLoading, refetch, isPending, isError } = useQuery({
		queryKey: ['userAuth'],
		queryFn: async () => {
			return await auth.currentUser();
		},
		retry: 1,
		refetchOnWindowFocus: false
	});

	return { isFetching, error, user: data, isLoading, refetch, isPending, isError };
};
