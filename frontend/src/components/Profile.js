import React, { useEffect } from 'react'
import { refreshToken } from '../utils/auth' // Імпортуємо функцію для оновлення токена
import '../styles/Profile.css'

function Profile() {
	useEffect(() => {
		const checkToken = async () => {
			const access = await refreshToken() // Оновлюємо токен, якщо потрібно
			if (access) {
				console.log('Access token updated')
				// Використовуйте цей токен для будь-яких запитів до API
			} else {
				console.log('Failed to update access token')
			}
		}

		checkToken() // Викликаємо функцію при завантаженні компонента
	}, [])

	return (
		<div>
			<h1>Profile Page</h1>
			<p>View and edit your profile here.</p>
		</div>
	)
}

export default Profile
