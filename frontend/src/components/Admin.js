import React, { useEffect } from 'react'
import { refreshToken } from '../utils/auth' // Імпортуємо функцію для оновлення токена
import '../styles/Admin.css'

function Admin() {
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
			<h1>Admin Page</h1>
			<p>Admin dashboard for managing the site.</p>
		</div>
	)
}

export default Admin
