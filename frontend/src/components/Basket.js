import React, { useEffect } from 'react'
import { refreshToken } from '../utils/auth'
import '../styles/Basket.css'


function Basket() {
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
			<h1>Basket Page</h1>
			<p>View and edit your basket here.</p>
		</div>
	)
}

export default Basket