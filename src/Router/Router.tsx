import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../page/Home';
import { Staff } from '../page/Staff';
import Employee from '../page/Employee';

export const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/staff' element={<Staff />} />
			<Route path='/employee/:id' element={<Employee />} />
			<Route path='*' element={<Navigate to={'/'} replace />} />
		</Routes>
	);
};
