import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Sidebar.css'


function Sidebar() {
	return (
		<div className='sidebar'>
			<h2>Shop</h2>
			<ul>
				<li>
					<Link to='/catalog'>Catalog</Link>
				</li>
				<li>
					<Link to='/basket'>Basket</Link>
				</li>
				<li>
					<Link to='/admin'>Admin</Link>
				</li>
				<li>
					<Link to='/login'>Login</Link>
				</li>
			</ul>
		</div>
	)
}

export default Sidebar
