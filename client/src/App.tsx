import { Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './Components/Users/Users';
// import UserCard from './Components/User/UserCard';
import EditUser from './Components/EditUser/EditUser';
import UserCard from './Components/User/UserCard';
import Login from './Components/Login/Login.';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/users" element={<Users />} />
			<Route path="/userCard/:id" element={<UserCard />}></Route>
			<Route path="/createUpdateUser/:id" element={<EditUser />}></Route>
			<Route path="/createUpdateUser" element={<EditUser />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
		</Routes>
	);
}

export default App;
