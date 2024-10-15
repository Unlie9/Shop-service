import React, { useEffect } from 'react'
import { refreshToken } from '../utils/auth'
import '../styles/Admin.css'

function Admin() {
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
			<h1>Admin Page</h1>
			<p>Admin dashboard for managing the site.</p>
		</div>
	)
}

export default Admin
