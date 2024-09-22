import { CloseButton, Input } from '@mantine/core';
import { FC } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Inputs } from '../components/Modal/ModalAuth';
import { InputsSSS } from '../components/Modal/ModalCreate';

interface Props {
	register: UseFormRegister<Inputs> | UseFormRegister<InputsSSS>;
	setValue?: UseFormSetValue<Inputs>;
	watch: UseFormWatch<Inputs> | UseFormWatch<InputsSSS>;
	errors: boolean;
	type?: 'number' | 'text';
	nameInput: 'name' | 'email' | 'password' | 'confirmThePassword' | 'lastName' | 'age' | 'position' | 'firstName' | 'address';
	minLength: number;
	patternAuth?: { value: RegExp; message: string };
	placeholder: string;
}

export const InputCustom: FC<Props> = ({ errors, type, register, setValue, watch, patternAuth, placeholder, minLength, nameInput }) => {
	return (
		<Input
			rightSectionPointerEvents='all'
			error={errors}
			type={type}
			//@ts-ignore
			rightSection={<CloseButton onClick={() => setValue(nameInput, '')} aria-label='Clear input' style={{ display: watch()[nameInput] ? undefined : 'none' }} />}
			//@ts-ignore
			{...register(nameInput, {
				required: true,
				minLength,
				pattern: patternAuth
			})}
			placeholder={placeholder}
		/>
	);
};
