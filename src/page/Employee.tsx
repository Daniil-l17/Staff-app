import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Input, Loader, Skeleton } from '@mantine/core';

import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from '../services/employee/employee';
import { positions } from '../constants/constants';
import { useDisclosure } from '@mantine/hooks';
import { ModalDeleteEmployee } from '../components/Modal/ModalDeleteEmployee';

const Employee = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { user, isLoading: isLoadingUser } = useAuth();
	const [opened, { open, close }] = useDisclosure(false);
	const [userInfo, setuserInfo] = useState({
		firstName: '',
		lastName: '',
		age: '',
		address: '',
		position: ''
	});

	const { data, isFetching } = useQuery({
		queryKey: ['employee'],
		queryFn: async () => {
			return await employeeApi.employee(id!);
		},
		enabled: !!user?.id,
		select: data => {
			const { userId, ...copy } = { ...data };
			return copy;
		},
		refetchOnWindowFocus: false
	});

	const { mutate: mutateUpodate, isPending } = useMutation({
		mutationKey: ['employeeUpdate'],
		mutationFn: async () => {
			return await employeeApi.employeUpdate(userInfo);
		},
		onSuccess: () => {
			toast.success('Пользователь обновлен!', { theme: 'colored' });
			queryClient.invalidateQueries({ queryKey: ['employee'] });
		}
	});

	const handelUpdateEmployee = () => {
		if (data?.address === userInfo.address && data?.age === userInfo.age && data?.firstName === userInfo.firstName && data?.lastName === userInfo.lastName && data?.position === userInfo.position) {
			return toast.error('Вы ничего не поменяли!', { theme: 'colored' });
		}
		mutateUpodate();
	};

	useEffect(() => {
		if (user?.id.length) {
			if (!isFetching) {
				if (!data?.id) {
					navigate('/');
				}
			}
		}
	}, [data, isFetching]);

	useEffect(() => {
		if (data) {
			setuserInfo(data);
		}
	}, [data]);

	useEffect(() => {
		if (!isLoadingUser) {
			if (!user?.id.length) {
				navigate('/');
			}
		}
	}, [user, isLoadingUser]);

	const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setuserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	if (isLoadingUser)
		return (
			<div className=' w-full flex justify-center items-center min-h-[750px]'>
				<Loader />
			</div>
		);

	return (
		<div className=' min-h-[350px] m-auto w-full max-w-[1600px] justify-center flex flex-col px-4'>
			{isFetching ? (
				<Skeleton className='mb-4' height={25} width='250px' radius='4px' />
			) : !data?.id ? null : (
				<h2 className='font-medium text-lg mb-4'>
					{data?.firstName} {data?.lastName}
				</h2>
			)}
			<ModalDeleteEmployee name={`${data?.firstName} ${data?.lastName} `} id={data?.id!} opened={opened} close={close} />
			<div className='flex flex-col gap-4'>
				{isFetching ? (
					<>
						<Skeleton height={36} width='100%' radius='4px' />
						<Skeleton height={36} width='100%' radius='4px' />
						<Skeleton height={36} width='100%' radius='4px' />
						<Skeleton height={36} width='100%' radius='4px' />
						<Skeleton height={36} width='100%' radius='4px' />
					</>
				) : !data?.id ? null : (
					<>
						<Input onChange={changeInfo} autoFocus name='firstName' value={userInfo.firstName} variant='filled' />
						<Input onChange={changeInfo} name='lastName' value={userInfo.lastName} variant='filled' />
						<Input onChange={changeInfo} name='age' value={userInfo.age} variant='filled' />
						<Input onChange={changeInfo} name='address' value={userInfo.address} variant='filled' />
						<div className='flex justify-start gap-3 flex-wrap'>
							{positions.map((position, key) => (
								<Button key={key} onClick={() => setuserInfo(prev => ({ ...prev, position }))} color={userInfo.position === position ? 'green' : 'blue'}>
									{position}
								</Button>
							))}
						</div>
					</>
				)}
			</div>
			<div className='flex justify-between mt-5'>
				{isFetching ? (
					<>
						<Skeleton height={36} width='189.36px' radius='4px' />
						<Skeleton height={36} width='174.19px' radius='4px' />
					</>
				) : !data?.id ? null : (
					<>
						<Button loading={isPending} onClick={handelUpdateEmployee} color='blue'>
							Обновить работника
						</Button>
						<Button onClick={open} color='red'>
							Удалить работника
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default Employee;
