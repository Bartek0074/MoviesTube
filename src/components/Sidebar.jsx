import React from 'react';
import { categories } from '../utils/constants';
import '../styles/Sidebar.scss';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {

	return (
		<div className='categories'>
			{categories.map((category, id) => {
				return (
					<button
						className={
							selectedCategory === category.name
								? 'category-button category-button--active'
								: 'category-button'
						}
						onClick={() => setSelectedCategory(category.name)}
						key={id}
					>
						<span>{category.icon}</span>
						<span>{category.name}</span>
					</button>
				);
			})}
		</div>
	);
}
