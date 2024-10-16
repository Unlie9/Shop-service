import React, { useEffect, useState } from 'react'
import { refreshToken } from '../utils/auth'
import '../styles/Admin.css'

function Admin() {
	const [products, setProducts] = useState([])
	const [tags, setTags] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const [newProduct, setNewProduct] = useState({
		name: '',
		description: '',
		price: '',
		tags: [],
		image: null,
	})
	const [editMode, setEditMode] = useState(false)
	const [editProductId, setEditProductId] = useState(null)

	useEffect(() => {
		const fetchAdminData = async () => {
			try {
				const access = await refreshToken()
				if (access) {
					const productResponse = await fetch(
						'http://127.0.0.1:8002/product/admin/',
						{
							method: 'GET',
							headers: {
								Authorization: `Bearer ${access}`,
								'Content-Type': 'application/json',
							},
						}
					)

					const tagResponse = await fetch('http://127.0.0.1:8002/tag/admin/', {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${access}`,
							'Content-Type': 'application/json',
						},
					})

					if (productResponse.ok && tagResponse.ok) {
						const productData = await productResponse.json()
						const tagData = await tagResponse.json()

						setProducts(productData.results || productData)
						setTags(tagData.results || tagData)
						setLoading(false)
					} else {
						setError('Failed to load data.')
						setLoading(false)
					}
				} else {
					setError('Failed to refresh token')
					setLoading(false)
				}
			} catch (err) {
				console.error('Error fetching admin data:', err)
				setError('Error fetching data')
				setLoading(false)
			}
		}

		fetchAdminData()
	}, [])

	const handleProductInputChange = e => {
		const { name, value } = e.target
		if (name === 'image') {
			setNewProduct({ ...newProduct, image: e.target.files[0] })
		} else {
			setNewProduct({ ...newProduct, [name]: value })
		}
	}

	const handleCreateOrUpdateProduct = async () => {
		try {
			const access = await refreshToken()
			let response

			if (editMode) {
				const updatedProductData = {
					name: newProduct.name,
					description: newProduct.description,
					price: newProduct.price,
					tags: newProduct.tags.map(tag => parseInt(tag, 10)),
				}

				response = await fetch(
					`http://127.0.0.1:8002/product/admin/${editProductId}/`,
					{
						method: 'PUT',
						headers: {
							Authorization: `Bearer ${access}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(updatedProductData),
					}
				)
			} else {
				const formData = new FormData()
				formData.append('name', newProduct.name)
				formData.append('description', newProduct.description)
				formData.append('price', newProduct.price)
				if (newProduct.image) formData.append('image', newProduct.image)

				newProduct.tags.forEach(tag => {
					formData.append('tags', tag)
				})

				response = await fetch('http://127.0.0.1:8002/product/admin/', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${access}`,
					},
					body: formData,
				})
			}

			if (response.ok) {
				const createdOrUpdatedProduct = await response.json()
				if (editMode) {
					setProducts(
						products.map(p =>
							p.id === createdOrUpdatedProduct.id ? createdOrUpdatedProduct : p
						)
					)
				} else {
					setProducts([...products, createdOrUpdatedProduct])
				}
				setNewProduct({
					name: '',
					description: '',
					price: '',
					tags: [],
					image: null,
				})
				setEditMode(false)
				setEditProductId(null)
			} else {
				const errorData = await response.json()
				console.error('Error creating/updating product:', errorData)
				setError('Failed to create/update product.')
			}
		} catch (err) {
			console.error('Error creating/updating product:', err)
			setError('Error creating/updating product.')
		}
	}

	const handleEditProduct = product => {
		setNewProduct({
			name: product.name,
			description: product.description,
			price: product.price,
			tags: product.tags.map(tag => tag.id.toString()),
			image: null,
		})
		setEditMode(true)
		setEditProductId(product.id)
	}

	const handleDeleteProduct = async productId => {
		try {
			const access = await refreshToken()
			const response = await fetch(
				`http://127.0.0.1:8002/product/admin/${productId}/`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${access}`,
					},
				}
			)

			if (response.ok) {
				setProducts(products.filter(p => p.id !== productId))
			} else {
				setError('Failed to delete product.')
			}
		} catch (err) {
			console.error('Error deleting product:', err)
			setError('Error deleting product.')
		}
	}

	const handleDeleteTag = async tagId => {
		try {
			const access = await refreshToken()
			const response = await fetch(
				`http://127.0.0.1:8002/tag/admin/${tagId}/`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${access}`,
					},
				}
			)

			if (response.ok) {
				setTags(tags.filter(t => t.id !== tagId))
			} else {
				setError('Failed to delete tag.')
			}
		} catch (err) {
			console.error('Error deleting tag:', err)
			setError('Error deleting tag.')
		}
	}

	if (loading) {
		return <p>Loading admin data...</p>
	}

	if (error) {
		return <p>{error}</p>
	}

	return (
		<div className='admin-container'>
			<h1>Admin Dashboard</h1>

			<div className='admin-section'>
				<h2>{editMode ? 'Edit Product' : 'Create Product'}</h2>
				<input
					type='text'
					name='name'
					value={newProduct.name}
					placeholder='Product name'
					onChange={handleProductInputChange}
				/>
				<input
					type='text'
					name='description'
					value={newProduct.description}
					placeholder='Description'
					onChange={handleProductInputChange}
				/>
				<input
					type='number'
					name='price'
					value={newProduct.price}
					placeholder='Price'
					onChange={handleProductInputChange}
				/>
				<select
					multiple
					name='tags'
					value={newProduct.tags}
					onChange={e =>
						setNewProduct({
							...newProduct,
							tags: Array.from(
								e.target.selectedOptions,
								option => option.value
							),
						})
					}
				>
					{tags.map(tag => (
						<option key={tag.id} value={tag.id}>
							{tag.name}
						</option>
					))}
				</select>
				<input type='file' name='image' onChange={handleProductInputChange} />
				<button onClick={handleCreateOrUpdateProduct}>
					{editMode ? 'Update Product' : 'Create Product'}
				</button>
			</div>

			<div className='admin-section'>
				<h2>Products</h2>
				{Array.isArray(products) ? (
					products.map(product => (
						<div key={product.id}>
							<p>
								{product.name} - ${product.price}
							</p>
							<button onClick={() => handleEditProduct(product)}>Edit</button>
							<button onClick={() => handleDeleteProduct(product.id)}>
								Delete
							</button>
						</div>
					))
				) : (
					<p>No products available.</p>
				)}
			</div>

			<div className='admin-section'>
				<h2>Tags</h2>
				{Array.isArray(tags) ? (
					tags.map(tag => (
						<div key={tag.id}>
							<p>{tag.name}</p>
							<button onClick={() => handleDeleteTag(tag.id)}>Delete</button>
						</div>
					))
				) : (
					<p>No tags available.</p>
				)}
			</div>
		</div>
	)
}

export default Admin
