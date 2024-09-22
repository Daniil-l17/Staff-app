import { Table } from '@mantine/core';
import { tableHead } from '../constants/constants';

export const TableThead = () => {
	return (
		<Table.Thead>
			<Table.Tr>
				{tableHead.map((item, index) => (
					<Table.Th key={index} className='!w-[200px]'>
						{item}
					</Table.Th>
				))}
			</Table.Tr>
		</Table.Thead>
	);
};
