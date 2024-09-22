import { Button, Modal } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { employeeApi, result } from '../../services/employee/employee';
import { toast } from 'react-toastify';
import { positions } from '../../constants/constants';
import { InputCustom } from '../../utils/Input';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface InputsSSS {
	firstName: string;
	lastName: string;
	age: string;
	position: string;
	address: string;
}

export default function ModalCreate({ opened, close }: { opened: boolean; close: () => void }) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<InputsSSS>();

	const [userInfoPosition, setUserInfoPosition] = useState('');
	const queryClient = useQueryClient();

	const onSubmit: SubmitHandler<InputsSSS> = dto => {
		if (userInfoPosition.length) {
			mutate({ ...dto, position: userInfoPosition });
		}
	};

	const { isPending, mutate } = useMutation({
		mutationFn: async (dto: Omit<result, 'id'>) => {
			return employeeApi.employeeAdd(dto);
		},
		mutationKey: ['employeeAdd'],
		onSuccess: employee => {
			queryClient.invalidateQueries({ queryKey: ['staff'] });
			toast.success(`Сотрудник ${employee.lastName + ' ' + employee.firstName} добавлен!`, { theme: 'colored' });
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-4 mt-2'>
					<InputCustom nameInput='firstName' minLength={3} watch={watch} errors={!!errors.firstName} placeholder='Имя' register={register} />
					<InputCustom nameInput='lastName' minLength={3} watch={watch} errors={!!errors.lastName} placeholder='Фамилия' register={register} />
					<InputCustom type='number' nameInput='age' minLength={1} watch={watch} errors={!!errors.age} placeholder='Возраст' register={register} />
					<InputCustom nameInput='address' minLength={3} watch={watch} errors={!!errors.address} placeholder='Адрес' register={register} />
					<div className='flex flex-col mb-2 gap-2'>
						<h2>Должность</h2>
						<div className='flex justify-start gap-3 flex-wrap'>
							{positions.map((position, key) => (
								<Button key={key} onClick={() => setUserInfoPosition(position)} color={userInfoPosition === position ? 'green' : 'blue'}>
									{position}
								</Button>
							))}
						</div>
					</div>
				</div>
				<div className='flex mt-3 justify-end'>
					<Button type='submit' loading={isPending}>
						Добавить
					</Button>
				</div>
			</form>
		</Modal>
	);
}
