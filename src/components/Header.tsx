import { Button, Loader, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ModalAuth } from './Modal/ModalAuth';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

export const Header = () => {
	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure(false);
	const [registerInfo, setRegister] = useState<'login' | 'register' | ''>('');
	const { data, isFetching } = useAuth();
	const queryClient = useQueryClient();
	const hendelClickModalAuth = (str: 'login' | 'register' | '') => {
		open();
		setRegister(str);
	};

	const logout = () => {
		localStorage.removeItem('token');
		queryClient.invalidateQueries({ queryKey: ['userAuth'] });
	};

	return (
		<header className='flex items-center justify-between py-4 px-4 w-full max-w-[1600px] m-auto'>
			<ModalAuth registerInfo={registerInfo} opened={opened} close={close} />
			<h1 onClick={() => navigate('/')} className=' cursor-pointer font-semibold text-[32px]'>
				Сотрудники
			</h1>
			{isFetching ? (
				<div className='flex gap-4 items-center'>
					<Skeleton height={26} width='130px' radius='md' />
					<Skeleton height={26} width='130px' radius='md' />
				</div>
			) : data?.id ? (
				<div className='flex items-center gap-8'>
					<h2 className=' cursor-pointer text-lg font-medium' onClick={() => navigate('/staff')}>
						Сотрудники
					</h2>
					<div onClick={logout} className='flex mt-1 gap-3 cursor-pointer items-center'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-7 hoverLogo '>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
							/>
						</svg>
					</div>
				</div>
			) : (
				<div className='flex h-[34px] gap-8'>
					<Button onClick={() => hendelClickModalAuth('login')}>войти</Button>
					<Button onClick={() => hendelClickModalAuth('register')}>Создать аккаунт</Button>
				</div>
			)}
		</header>
	);
};
