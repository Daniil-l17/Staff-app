import { axiosBase } from '../../config/axiosBase';

export interface result {
	firstName: string;
	lastName: string;
	id: string;
	age: string;
	position: string;
	address: string;
}

export const employeeApi = {
	employeAll: async () => {
		return (await axiosBase.get<result[]>('/employees')).data;
	},
	employeeAdd: async (dto: Omit<result, 'id'>) => {
		return (await axiosBase.post<result>(`/employees/add`, dto)).data;
	}
};
