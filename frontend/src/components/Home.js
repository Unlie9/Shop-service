import React, { useState, useEffect } from 'react'
import { refreshToken } from '../utils/auth'
import '../styles/Home.css'

function Home() {
	const [products, setProducts] = useState([]) // Состояние для хранения списка продуктов
	const [loading, setLoading] = useState(true) // Состояние для загрузки
	const [error, setError] = useState('') // Состояние для ошибок

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const access = await refreshToken() // Обновляем токен
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
						console.log('Data from API:', data) // Выводим данные для проверки

						// Если данные содержат поле results (пагинация), используем его
						if (data.results) {
							setProducts(data.results)
						} else {
							setProducts(data) // Если просто массив
						}

						setLoading(false) // Отключаем состояние загрузки
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

		fetchProducts()
	}, [])

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
							<p>Category: {product.category}</p>
							<p>Tags: {product.tags.map(tag => tag.name).join(', ')}</p>
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
