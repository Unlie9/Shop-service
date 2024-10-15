import React, { useEffect } from 'react'
import { refreshToken } from '../utils/auth' // Імпортуємо функцію для оновлення токена
import '../styles/Home.css'

function Home() {
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
			<h1>Home Page</h1>
			<p>Welcome to the home page!</p>
		</div>
	)
}

export default Home
