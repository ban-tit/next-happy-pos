import {Box, Button, } from '@mui/material'
import Layout from './Layout'

const Logout = () => {
		return (
		<Layout title='Log out'>
			<Box sx={{textAlign:'center',minWidth:'300px', width: 'content-fit', margin: '0 auto',mt: 5,}}>
				<h1>You are now log out.</h1>
				{/* <Button variant="contained" 
					onClick= {}>
					Login
				</Button> */}
			</Box>
		</Layout>
	)
}

export default Logout;