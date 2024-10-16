import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Basket from "./components/Basket";
import Sidebar from "./utils/sidebar";

import './styles/Global.css'


function App() {
	return (
		<Router>
			<div className='app-container'>
				<Sidebar /> 
				<div className='main-content'>
					<Routes>
						<Route path='/catalog' element={<Home />} />
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
						<Route path='/admin' element={<Admin />} />
						<Route path='/basket' element={<Basket />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
