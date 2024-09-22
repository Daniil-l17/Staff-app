import { axiosBase } from '../../config/axiosBase';

export interface result {
	firstName: string;
	lastName: string;
	id?: string;
	age: string;
	userId?: string;
	position: string;
	address: string;
}

export const employeeApi = {
	employeAll: async () => {
		return (await axiosBase.get<result[]>('/employees')).data;
	},
	employeUpdate: async (dto: result) => {
		return (await axiosBase.put<result>(`/employees/edit/${dto.id}`, dto)).data;
	},
	employeDelete: async (id: string) => {
		return (await axiosBase.post<result>(`/employees/remove/${id}`, { id })).data;
	},
	employeeAdd: async (dto: Omit<result, 'id' | 'userId'>) => {
		return (await axiosBase.post<result>(`/employees/add`, dto)).data;
	},
	employee: async (id: string) => {
		return (await axiosBase.get<result>(`/employees/${id} `)).data;
	}
};
