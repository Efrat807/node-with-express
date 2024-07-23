import { IUser } from '../../ApiService/Interfaces/IUser';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import './Users.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGetAllUsers, useUser } from '../../ApiService/Requests/UseUser';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const Users = () => {
	const { users, isLoading, error } = useGetAllUsers();
	const { deleteUser } = useUser();
	const navigate = useNavigate();

	const columnDefs: ColDef[] = [
		{ headerName: 'firstName', field: 'firstName' },
		{ headerName: 'lastName', field: 'lastName' },
		{ headerName: 'Phone', field: 'phone' },
		{ headerName: 'Email', field: 'email' },
		{
			headerName: 'Delete',
			cellRenderer: (params: ICellRendererParams<IUser>) => (
				<Button onClick={() => deleteUser(params.data?._id || '')}>
					<DeleteIcon style={{color: 'black'}}/>
				</Button>
			),
		},
	];

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {(error as Error).message}</div>;

	return (
		<div className="ag-theme-alpine" style={{ height: 700, width: 1020, marginBottom: '150px' }}>
			<Button
				onClick={() => {
					navigate('/createUpdateUser');
				}}
			>
				create new user
			</Button>
			<AgGridReact<IUser>
				rowData={users}
				columnDefs={columnDefs}
				defaultColDef={{ sortable: true, filter: true }}
				onRowDoubleClicked={(params) =>
					navigate(`/userCard/${params.data?._id}`)
				}
			/>
		</div>
	);
};
export default Users;
