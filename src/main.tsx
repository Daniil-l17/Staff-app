import ReactDOM from 'react-dom/client';
import './style/index.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router/Router.tsx';
import { MainLayout } from './layout/MainLayout.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<MantineProvider defaultColorScheme='dark'>
		<BrowserRouter>
			<MainLayout>
				<Router />
			</MainLayout>
		</BrowserRouter>
	</MantineProvider>
);
