import { axiosBase } from '../../config/axiosBase';

interface infoDto {
	name: string;
	email: string;
	password: string;
}

interface dataInfo {
	id: string;
	email: string;
	password: string;
	name: string;
}

export const auth = {
	register: async (dto: infoDto) => {
		return (await axiosBase.post<{ token: string }>('/user/register', dto)).data;
	},
	login: async (dto: Omit<infoDto, 'name'>) => {
		return (await axiosBase.post<{ token: string }>('/user/login', dto)).data;
	},
	currentUser: async () => {
		return (await axiosBase.get<dataInfo>('/user/current')).data;
	}
};
