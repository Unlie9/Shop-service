import React, { useEffect } from 'react'
import { refreshToken } from '../auth'
import '../styles/Profile.css'

function Profile() {
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
			<h1>Profile Page</h1>
			<p>View and edit your profile here.</p>
		</div>
	)
}

export default Profile
