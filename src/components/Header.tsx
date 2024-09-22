import { Button, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ModalAuth } from './Modal/ModalAuth';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { EmployeeIcon } from '../utils/icon/Employee';
import { ExitIcon } from '../utils/icon/Exit';

const Header = () => {
	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure(false);
	const [registerInfo, setRegister] = useState<'login' | 'register' | ''>('');
	const { user, isLoading } = useAuth();
	const queryClient = useQueryClient();

	const hendelClickModalAuth = (str: 'login' | 'register' | '') => {
		open();
		setRegister(str);
	};

	const logout = () => {
		localStorage.removeItem('token');
		queryClient.invalidateQueries({ queryKey: ['userAuth'] });
		queryClient.clear();
		navigate('/');
		toast.error('Вы вышли из аккаунта!', { theme: 'colored' });
	};

	return (
		<header className='flex items-center justify-between py-4 px-4 w-full max-w-[1600px] m-auto'>
			<ModalAuth setRegister={setRegister} registerInfo={registerInfo} opened={opened} close={close} />
			<h1 onClick={() => navigate('/')} className=' cursor-pointer font-semibold text-[32px]'>
				Сотрудники
			</h1>
			{isLoading ? (
				<div className='flex gap-8 items-center'>
					<Loader size='sm' />
				</div>
			) : user?.id ? (
				<div className='flex items-center gap-8'>
					<div onClick={() => navigate('/staff')} className='cursor-pointer hover:scale-110 transition-all duration-300'>
						<EmployeeIcon />
					</div>
					<div onClick={logout} className=' cursor-pointer hover:scale-110 transition-all duration-300 '>
						<ExitIcon />
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

export default Header;
