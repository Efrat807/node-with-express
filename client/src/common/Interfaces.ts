import { AxiosRequestConfig } from "axios";

export type FetchMethod = 'Post' | 'Patch' | 'Put' | 'Delete';

export interface IMutation<TData> {
	path: string;
	method: FetchMethod;
	data: TData;
	headers?: AxiosRequestConfig['headers'];
}
