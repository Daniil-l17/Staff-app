import { Button, Modal } from '@mantine/core';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputCustom } from '../../utils/Input';
import { auth } from '../../services/auth/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
	opened: boolean;
	registerInfo: 'login' | 'register' | '';
	close: () => void;
}

export interface Inputs {
	email: string;
	password: string;
	name: string;
	confirmThePassword: string;
}

export const ModalAuth: FC<Props> = ({ opened, close, registerInfo }) => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm<Inputs>();
	const queryClient = useQueryClient();
	const { data, isPending, mutate } = useMutation({
		mutationFn: async (dto: Omit<Inputs, 'confirmThePassword'>) => {
			return registerInfo === 'login' ? await auth.login(dto) : await auth.register(dto);
		},
		mutationKey: ['auth'],
		onSuccess: res => {
			if (res?.token) {
				localStorage.setItem('token', res?.token);
				queryClient.invalidateQueries({ queryKey: ['userAuth'] });
				close();
			}
		}
	});

	const onSubmit: SubmitHandler<Inputs> = async dto => {
		if (watch().password === watch().confirmThePassword) {
			mutate(dto);
		}
	};

	console.log(data);

	return (
		<Modal
			size={'lg'}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3
			}}
			opened={opened}
			onClose={close}
			title={registerInfo === 'login' ? 'Авторизация' : 'Регистрация'}
			centered
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-4'>
					<InputCustom
						patternAuth={{
							value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: 'Invalid email address'
						}}
						nameInput='email'
						minLength={6}
						watch={watch}
						setValue={setValue}
						errors={!!errors.email}
						placeholder='Введите email'
						register={register}
					/>
					{registerInfo === 'register' && <InputCustom nameInput='name' minLength={6} watch={watch} setValue={setValue} errors={!!errors.name} placeholder='Введите Имя' register={register} />}
					<InputCustom nameInput='password' minLength={6} watch={watch} setValue={setValue} errors={!!errors.password} placeholder='Введите пароль' register={register} />
					<InputCustom nameInput='confirmThePassword' minLength={6} watch={watch} setValue={setValue} errors={!!errors.confirmThePassword} placeholder='Подтвердите пароль' register={register} />
				</div>
				<div className='flex justify-end mt-4'>
					<Button loading={isPending} type='submit'>
						{registerInfo === 'login' ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</div>
			</form>
		</Modal>
	);
};
