import React, { useState, useEffect } from 'react'
import { refreshToken } from '../utils/auth'
import '../styles/Home.css'

function Home() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [basketId, setBasketId] = useState(null)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const access = await refreshToken()
				if (access) {
					const response = await fetch('http://127.0.0.1:8002/product/user/', {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${access}`,
							'Content-Type': 'application/json',
						},
					})

					if (response.ok) {
						const data = await response.json()
						setProducts(data.results ? data.results : data)
						setLoading(false)
					} else {
						setError('Failed to load products')
						setLoading(false)
					}
				} else {
					setError('Failed to refresh token')
					setLoading(false)
				}
			} catch (err) {
				console.error('Error fetching products:', err)
				setError('Error fetching products')
				setLoading(false)
			}
		}

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
							setBasketId(basketData.results[0].id) 
						}
					}
				}
			} catch (err) {
				console.error('Error fetching basket:', err)
			}
		}

		fetchProducts()
		fetchBasket()
	}, [])

	const handleAddToBasket = async productId => {
		try {
			const access = await refreshToken()
			if (access && basketId) {
				const response = await fetch(
					`http://127.0.0.1:8002/basket/${basketId}/add-product/`,
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
					alert('Product added to basket!')
				} else {
					alert('Failed to add product to basket.')
				}
			}
		} catch (err) {
			console.error('Error adding product to basket:', err)
			alert('Error adding product to basket.')
		}
	}

	if (loading) {
		return <p>Loading products...</p>
	}

	if (error) {
		return <p>{error}</p>
	}

	return (
		<div className='home-container'>
			<h1>Products</h1>
			<div className='product-list'>
				{Array.isArray(products) ? (
					products.map(product => (
						<div key={product.id} className='product-item'>
							<img
								src={product.image}
								alt={product.name}
								className='product-image'
							/>
							<h3>{product.name}</h3>
							<p>Price: ${product.price}</p>
							<p>Tags: {product.tags.map(tag => tag.name).join(', ')}</p>
							<button onClick={() => handleAddToBasket(product.id)}>
								Add to Basket
							</button>
						</div>
					))
				) : (
					<p>No products available.</p>
				)}
			</div>
		</div>
	)
}

export default Home
