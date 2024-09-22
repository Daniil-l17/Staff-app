import { Button, Modal } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from '../../services/employee/employee';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ModalDeleteEmployee = ({ opened, close, name, id }: { opened: boolean; close: () => void; name: string; id: string }) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { isPending, mutate } = useMutation({
		mutationFn: async (id: string) => {
			return employeeApi.employeDelete(id);
		},
		mutationKey: ['employeeDelete'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['staff'] });
			navigate('/staff');
			toast.success(`Сотрудник был удален!`, { theme: 'colored' });
			close();
		}
	});

	return (
		<Modal opened={opened} onClose={close} title={`Удалить сотрудника ${name}?`} centered>
			<div className='flex gap-4 justify-end'>
				<Button onClick={close} color='blue'>
					Отменить
				</Button>
				<Button loading={isPending} onClick={() => mutate(id)} color='red'>
					Удалить
				</Button>
			</div>
		</Modal>
	);
};
