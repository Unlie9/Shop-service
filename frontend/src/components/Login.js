import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' 
import '../styles/Login.css'

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const [message, setMessage] = useState('')
	const navigate = useNavigate() 

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const response = await fetch('http://127.0.0.1:8002/user/token/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			})

			const data = await response.json()
			if (response.ok) {
				localStorage.setItem('access', data.access)
				localStorage.setItem('refresh', data.refresh)
				setMessage('Login successful! Redirecting to catalog...')

				setTimeout(() => {
					navigate('/catalog')
				}, 1000)
			} else {
				setMessage(
					data.detail || 'Login failed! Check your email and password.'
				)
			}
		} catch (error) {
			setMessage('An error occurred during login.')
		}
	}

	return (
		<div className='login-container'>
			<h1>Login</h1>
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
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<button type='submit'>Login</button>
			</form>
			<p>{message}</p>
			<p>
				Not registered yet? <Link to='/register'>Click here to register</Link>{' '}
			</p>
		</div>
	)
}

export default Login
