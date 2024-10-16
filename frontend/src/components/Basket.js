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
							setBasket(basketData.results[0]) 
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

	const handleRemoveProduct = async productId => {
		try {
			const access = await refreshToken()
			if (access) {
				const response = await fetch(
					`http://127.0.0.1:8002/basket/${basket.id}/remove-product/`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${access}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ product_id: productId }),
					}
				)

				if (response.ok) {
					setBasket(prevBasket => ({
						...prevBasket,
						products: prevBasket.products.filter(
							product => product.id !== productId
						),
					}))
				} else {
					setError('Failed to remove product.')
				}
			} else {
				setError('Failed to refresh token')
			}
		} catch (err) {
			console.error('Error removing product:', err)
			setError('Error removing product.')
		}
	}

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
								<button onClick={() => handleRemoveProduct(product.id)}>
									Remove
								</button>
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
