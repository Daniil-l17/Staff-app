import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { Home } from '../page/Home';
import Staff from '../page/Staff';

export const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/staff' element={<Staff />} />
			{/*        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee/:id" element={<Employee />} />
        <Route path="*" element={<Navigate to={'/'} replace />} />
        <Route path="/staff" element={<Staff />} />*/}
		</Routes>
	);
};
