import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsPlayFill, BsSearch } from 'react-icons/bs';
import '../styles/Navbar.scss';

export default function Navbar() {
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	const onClickHandle = (e) => {
		e.preventDefault();
		if (searchTerm) {
			navigate(`/search/${searchTerm}`);
			setSearchTerm('');
		}
	};

	return (
		<nav className='navbar'>
			<Link className='navbar__homeBtn' to='/'>
				<span>movies</span>
				<BsPlayFill className='navbar__homeBtn-icon' />
				<span>tube</span>
			</Link>
			<form>
				<input
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					type='text'
					placeholder='Search for...'
				/>
				<button onClick={onClickHandle} type='submit'>
					<BsSearch />
				</button>
			</form>
		</nav>
	);
}
