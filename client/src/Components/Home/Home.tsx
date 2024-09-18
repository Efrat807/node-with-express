import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

	return <div>
        <h1>Home</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Welcome to Our App</h1>
            <p>Please login or sign up to continue</p>
            <div style={{ marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/signup')}
                >
                    Sign Up
                </Button>
            </div>
        </div>
    </div>;
};

export default Home;