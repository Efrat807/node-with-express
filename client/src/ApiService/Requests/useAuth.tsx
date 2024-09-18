import { IMutation } from '../../common/Interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ILogin {
	userName: string;
	password: string;
}
export const useLogin = () => {
	const { mutate: Login, ...loginInfo } = useMutation<ILogin, unknown, IMutation<ILogin>>({});
	const login = (data: ILogin, options?: UseMutationOptions<ILogin, unknown, IMutation<ILogin>>) => {
		Login(
			{
				method: 'Post',
				path: 'login',
				headers: {},
				data,
			},
			{ ...options }
		);
	};
	return { login, ...loginInfo };
};
