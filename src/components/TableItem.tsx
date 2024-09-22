import { Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { result } from '../services/employee/employee';

export const TableItem = ({ element }: { element: result }) => {
	const navigate = useNavigate();
	return (
		<Table.Tr onClick={() => navigate(`/employee/${element.id}`)} className=' hover:bg-[#373c47] cursor-pointer' key={element.id}>
			<Table.Td>{element.firstName}</Table.Td>
			<Table.Td>{element.lastName}</Table.Td>
			<Table.Td>{element.age}</Table.Td>
			<Table.Td>{element.address}</Table.Td>
			<Table.Td>{element.position}</Table.Td>
		</Table.Tr>
	);
};
