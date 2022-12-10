import React from 'react';

import { categories } from '../utils/constants';

import '../styles/Sidebar.scss';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
	return (
		<div className='sidebar'>
			{categories.map((category, id) => {
				return (
					<button
						className={
							selectedCategory === category.name
								? 'sidebar__button sidebar__button--active'
								: 'sidebar__button'
						}
						onClick={() => setSelectedCategory(category.name)}
						key={id}
					>
						<span className='sidebar__category-icon'>{category.icon}</span>
						<span className='sidebar__category-name'>{category.name}</span>
					</button>
				);
			})}
		</div>
	);
}
