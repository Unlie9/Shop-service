import React, { useState } from 'react'
import '../styles/Register.css'

function Register() {
	const [formData, setFormData] = useState({
		email: '',
		first_name: '',
		last_name: '',
		password: '',
	})

	const [message, setMessage] = useState('')

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const response = await fetch('http://localhost:8002/user/register/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				setMessage('Registration successful!')
				setFormData({ email: '', first_name: '', last_name: '', password: '' })
			} else {
				const data = await response.json()
				setMessage(data.detail || 'Registration failed!')
			}
		} catch (error) {
			setMessage('An error occurred during registration.')
		}
	}

	return (
		<div className='register-container'>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type='text'
					name='first_name'
					placeholder='First Name'
					value={formData.first_name}
					onChange={handleChange}
					required
				/>
				<input
					type='text'
					name='last_name'
					placeholder='Last Name'
					value={formData.last_name}
					onChange={handleChange}
					required
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type='submit'>Register</button>
			</form>
			<p>{message}</p>
		</div>
	)
}

export default Register
