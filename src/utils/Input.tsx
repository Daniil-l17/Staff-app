import { CloseButton, Input } from '@mantine/core';
import { FC } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Inputs } from '../components/Modal/ModalAuth';

interface Props {
	register: UseFormRegister<Inputs>;
	setValue: UseFormSetValue<Inputs>;
	watch: UseFormWatch<Inputs>;
	errors: boolean;
	nameInput: 'name' | 'email' | 'password' | 'confirmThePassword';
	minLength: number;
	patternAuth?: { value: RegExp; message: string };
	placeholder: string;
}

export const InputCustom: FC<Props> = ({ errors, register, setValue, watch, patternAuth, placeholder, minLength, nameInput }) => {
	return (
		<Input
			rightSectionPointerEvents='all'
			error={errors}
			rightSection={<CloseButton onClick={() => setValue(nameInput, '')} aria-label='Clear input' style={{ display: watch()[nameInput] ? undefined : 'none' }} />}
			{...register(nameInput, {
				required: true,
				minLength,
				pattern: patternAuth
			})}
			placeholder={placeholder}
		/>
	);
};
