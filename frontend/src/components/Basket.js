import React, { useEffect, useState } from 'react'
import { refreshToken } from '../utils/auth'
import '../styles/Basket.css'

function Basket() {
	const [basket, setBasket] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchBasket = async () => {
			try {
				const access = await refreshToken()
				if (access) {
					const response = await fetch('http://127.0.0.1:8002/basket/', {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${access}`,
							'Content-Type': 'application/json',
						},
					})

					if (response.ok) {
						const basketData = await response.json()
						if (basketData.results && basketData.results.length > 0) {
							setBasket(basketData.results[0]) // Предполагаем, что у пользователя одна корзина
						} else {
							setBasket(null)
						}
					} else {
						setError('Failed to load basket.')
					}
					setLoading(false)
				} else {
					setError('Failed to refresh token')
					setLoading(false)
				}
			} catch (err) {
				console.error('Error fetching basket:', err)
				setError('Error fetching basket.')
				setLoading(false)
			}
		}

		fetchBasket()
	}, [])

	if (loading) {
		return <p>Loading basket data...</p>
	}

	if (error) {
		return <p>{error}</p>
	}

	return (
		<div className='basket-container'>
			<h1>Your Basket</h1>
			{basket ? (
				<div className='basket-details'>
					<h2>Products in your basket:</h2>
					<ul>
						{basket.products.map(product => (
							<li key={product.id}>
								{product.name} - ${product.price}
							</li>
						))}
					</ul>
					<h3>Total Price: ${basket.total_price}</h3>
				</div>
			) : (
				<p>Your basket is empty.</p>
			)}
		</div>
	)
}

export default Basket
