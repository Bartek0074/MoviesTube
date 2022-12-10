import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
			<Link className='navbar__home-btn' to='/'>
				<span className='navbar__heading'>movies</span>
				<BsPlayFill className='navbar__home-btn-icon' />
				<span className='navbar__heading'>tube</span>
			</Link>
			<form className='navbar__form'>
				<input
					className='navbar__input'
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
					placeholder='Search for...'
					type='text'
				/>
				<button
					className='navbar__search-btn'
					onClick={onClickHandle}
					type='submit'
				>
					<BsSearch />
				</button>
			</form>
		</nav>
	);
}