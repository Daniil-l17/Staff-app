import { useNavigate } from 'react-router-dom';

import { Button, Loader, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { employeeApi } from '../services/employee/employee';
import { useAuth } from '../hooks/useAuth';
import ModalCreate from '../components/Modal/ModalCreate';
import { useDisclosure } from '@mantine/hooks';

export type DataType = {
	id?: string;
	firstName: string;
	lastName: string;
	age: string;
	position: string;
	address: string;
	userId?: string;
};

export default function Staff() {
	const naavigate = useNavigate();
	const user = useAuth();
	const [opened, { open, close }] = useDisclosure(false);
	const { data, isFetching, error } = useQuery({
		queryKey: ['employee'],
		queryFn: async () => {
			return await employeeApi.employeAll();
		},
		enabled: !!user.data?.id,
		refetchOnWindowFocus: false
	});

	if (user.isFetching)
		return (
			<div className='w-full flex min-h-[200px] justify-center items-center '>
				<Loader />
			</div>
		);

	return (
		<div className='w-full !px-4 m-auto max-w-[1600px] mt-10'>
			<ModalCreate opened={opened} close={close} />
			<div onClick={open} className=' mb-6'>
				<Button>добавить сотрудника</Button>
			</div>
			<Table striped withRowBorders={true}>
				<Table.Thead>
					<Table.Tr>
						<Table.Th className='!w-[200px]'>Имя</Table.Th>
						<Table.Th className='!w-[200px]'>Фамилия</Table.Th>
						<Table.Th className='!w-[200px]'>Возраст</Table.Th>
						<Table.Th className='!w-[200px]'>Адрес</Table.Th>
						<Table.Th className='!w-[200px]'>Должность</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{!isFetching
						? data?.map(element => (
								<Table.Tr onClick={() => naavigate(`/employee/${element.id}`)} className=' hover:bg-[#373c47] cursor-pointer' key={element.id}>
									<Table.Td>{element.firstName}</Table.Td>
									<Table.Td>{element.lastName}</Table.Td>
									<Table.Td>{element.age}</Table.Td>
									<Table.Td>{element.address}</Table.Td>
									<Table.Td>{element.position}</Table.Td>
								</Table.Tr>
						  ))
						: null}
				</Table.Tbody>
			</Table>
			{isFetching ? (
				<div className='flex justify-center min-h-[200px] items-center'>
					<Loader />
				</div>
			) : null}
			{!isFetching && !data?.length && !error ? (
				<div className=' mt-4 w-full'>
					<h2 className=' text-2lg text-center'>Сотрудников не найденно</h2>
				</div>
			) : null}
			{error && (
				<div className=' mt-10 w-full'>
					<h2 className=' text-red-500 font-medium text-2lg text-center'>Ошибка</h2>
				</div>
			)}
		</div>
	);
}
