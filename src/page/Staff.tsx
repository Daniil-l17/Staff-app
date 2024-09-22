import { useNavigate } from 'react-router-dom';
import { Button, Loader, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { employeeApi } from '../services/employee/employee';
import { useAuth } from '../hooks/useAuth';
import ModalCreate from '../components/Modal/ModalCreate';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { TableItem } from '../components/TableItem';
import { TableThead } from '../components/TableThead';

export const Staff = () => {
	const navigate = useNavigate();
	const { isLoading, user, isFetching: isFetchingUser } = useAuth();
	const [opened, { open, close }] = useDisclosure(false);

	useEffect(() => {
		if (!isLoading) {
			if (!user?.id.length) {
				navigate('/');
			}
		}
	}, [user, isLoading, isFetchingUser]);

	const { data, isFetching, error } = useQuery({
		queryKey: ['staff'],
		queryFn: async () => {
			return await employeeApi.employeAll();
		},
		enabled: !!user?.id,
		select: data => [...data].reverse(),
		refetchOnWindowFocus: false
	});

	if (isLoading)
		return (
			<div className='w-full flex min-h-[800px] justify-center items-center '>
				<Loader />
			</div>
		);

	if (!user?.id) return null;

	return (
		<div className='w-full !px-4 m-auto max-w-[1600px] mt-10'>
			<ModalCreate opened={opened} close={close} />
			<div onClick={open} className=' mb-6'>
				<Button>добавить сотрудника</Button>
			</div>
			<Table striped withRowBorders={true}>
				<TableThead />
				<Table.Tbody>{!isFetching ? data?.map(element => <TableItem element={element} />) : null}</Table.Tbody>
			</Table>
			{isFetching ? (
				<div className='flex justify-center min-h-[200px] items-center'>
					<Loader />
				</div>
			) : null}
			{!isFetching && !data?.length && !error ? (
				<div className=' mt-4 w-full'>
					<h2 className=' text-2lg font-medium text-center'>Сотрудников не найденно</h2>
				</div>
			) : null}
			{error && (
				<div className=' mt-10 w-full'>
					<h2 className=' text-red-500 font-medium text-2lg text-center'>Ошибка</h2>
				</div>
			)}
		</div>
	);
};
