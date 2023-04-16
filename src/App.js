import React from 'react'
import './app.css'
import Navbar from './header/Header'
import Create from './create/Create'
import Table from './table/Table'


function App(){
	return(
		<div className="container">
			<Navbar/>
			<div className="content">
				<Create />
				<Table />
			</div>
		</div>
	)
}
export default App