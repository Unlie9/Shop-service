import React, { useEffect } from 'react'
import { refreshToken } from '../utils/auth'
import '../styles/Home.css'

function Home() {
	useEffect(() => {
		const checkToken = async () => {
			const access = await refreshToken()
			if (access) {
				console.log('Access token updated')
			} else {
				console.log('Failed to update access token')
			}
		}

		checkToken()
	}, [])

	return (
		<div>
			<h1>Home Page</h1>
			<p>Welcome to the home page!</p>
		</div>
	)
}

export default Home
