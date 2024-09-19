import { Header } from '../components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			{children}
		</QueryClientProvider>
	);
};
