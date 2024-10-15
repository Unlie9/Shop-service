import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Admin from "./components/Admin"

import './styles/Global.css'


function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/admin' element={<Admin />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
