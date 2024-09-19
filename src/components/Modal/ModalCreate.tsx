import { Button, Input, Modal } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { employeeApi, result } from '../../services/employee/employee';
import { useForm } from 'react-hook-form';

const positions = ['Front-end', 'Back-end', 'Дизайнер', 'Тестировщик', 'Аналитик', 'Верстальщик', 'Team Lead'] as const;

interface Inputs {
	firstName: string;
	lastName: string;
	age: string;
	position: string;
	address: string;
}

export default function ModalCreate({
	opened,
	close,
	loading,
	addEmployee
}: {
	opened: boolean;
	close: () => void;
	loading: boolean;
	addEmployee: (obj: { firstName: string; lastName: string; age: string; position: string; address: string }) => void;
}) {
	const [userInfo, setUserInfo] = useState({
		firstName: '',
		lastName: '',
		age: '',
		position: '',
		address: ''
	});

	const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const queryClient = useQueryClient();

	const { data, isPending, mutate } = useMutation({
		mutationFn: async (dto: Omit<result, 'id'>) => {
			return employeeApi.employeeAdd(dto);
		},
		mutationKey: ['employeeAdd'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employee'] });
			close();
		}
	});

	return (
		<Modal
			size={'lg'}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3
			}}
			opened={opened}
			onClose={close}
			title='Добавить сотрудника'
			centered
		>
			<div className='flex flex-col gap-4 mt-2'>
				<Input onChange={changeInfo} name='firstName' variant='filled' placeholder='Имя' />
				<Input onChange={changeInfo} name='lastName' variant='filled' placeholder='Фамилия' />
				<Input onChange={changeInfo} name='age' variant='filled' placeholder='Возраст' />
				<Input onChange={changeInfo} name='address' variant='filled' placeholder='Адрес' />
				<div className='flex flex-col mb-2 gap-2'>
					<h2>Должность</h2>
					<div className='flex justify-start gap-3 flex-wrap'>
						{positions.map(position => (
							<Button onClick={() => setUserInfo(prev => ({ ...prev, position }))} color={userInfo.position === position ? 'green' : 'blue'}>
								{position}
							</Button>
						))}
					</div>
				</div>
			</div>
			<div className='flex mt-3 justify-end'>
				<Button onClick={() => mutate(userInfo)} loading={isPending}>
					Добавить
				</Button>
			</div>
		</Modal>
	);
}
