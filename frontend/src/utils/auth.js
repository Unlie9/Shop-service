export const refreshToken = async () => {
	try {
		const refresh = localStorage.getItem('refresh')
		if (!refresh) {
			throw new Error('No refresh token available')
		}

		const response = await fetch('http://127.0.0.1:8002/user/token/refresh/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refresh }),
		})

		const data = await response.json()

		if (response.ok) {
			localStorage.setItem('access', data.access)
			return data.access
		} else {
			throw new Error('Failed to refresh token')
		}
	} catch (error) {
		console.error('Error refreshing token:', error)
		return null
	}
}
