import {Box, Button, TextField} from '@mui/material'
import { useState } from 'react'
import Layout from './Layout'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState({name: '', email: '', password: ''})

	const register = async () => {
		const response = await fetch("http://localhost:5000/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})


		//19.7.2024 shani ngai na ngai bang
		if(response.ok){
			console.log('register ok');
			
			const responseData = await response.json();
			if(responseData.error){
				alert('something wrong')
				navigate("/register")
				return
			}
			const accessToken= responseData.accessToken;
			localStorage.setItem('accessToken', accessToken)
			navigate("/")
		}
	}

	return (
		<Layout title='Register'>
			<Box sx={{display:'flex', flexDirection:'column',  minWidth:'300px', width: '300px', margin: 'auto',mt: 5,}}>
				<TextField 
					label="Name" 
					variant="outlined"
					onChange={(evt)=> setUser({...user, name: evt.target.value})}
					sx={{minWidth:'300px'}} />
				<TextField label="Email" 
					variant="outlined" 
					onChange={(evt)=> setUser({...user, email: evt.target.value})}
					sx={{my: 5}} />
				<TextField label="Password" variant="outlined"
					onChange={(evt)=> setUser({...user, password: evt.target.value})}
					type= "password" 
					sx={{mb: 5}}/>
				<Button 
					variant="contained" 
					onClick= {register}
					disabled= {user.name.length>0 && user.email.length>0 && user.password.length>0 ? false : true}
				>
					Register
				</Button>
				<Link 
					style={{
						textAlign: 'center',
						marginTop: '10px'	
					}}
					to='/login'>Already register? Login here.
				</Link>
			</Box>
		</Layout>
	)
}

export default Register;