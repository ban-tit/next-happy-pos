import {Box, Button, TextField} from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from './Layout'

const Login = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState({email: '', password: ''})

	const login = async () => {
		const response = await fetch("http://localhost:5000/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})
		
		if(response.ok){
			const responseData = await response.json();
			const accessToken= responseData.accessToken;
			localStorage.setItem('accessToken', accessToken)
			navigate("/")
		}
	}

	return (
		<Layout title='Log in'>
			<Box sx={{display:'flex', flexDirection:'column',  minWidth:'300px', width: '300px', margin: 'auto',mt: 5,}}>
				<TextField label="Email" 
					variant="outlined" 
					onChange={(evt)=> setUser({...user, email: evt.target.value})}
					sx={{my: 5}} />
				<TextField label="Password" variant="outlined"
					onChange={(evt)=> setUser({...user, password: evt.target.value})}
					type= "password" 
					sx={{mb: 5}}/>
				<Button variant="contained" 
					onClick= {login}>
					Login
				</Button>
				<Link style={{textAlign: 'center',
						marginTop: '10px'	
				}} to='/register'>New User? Register here.</Link>
			</Box>
		</Layout>
	)
}

export default Login;