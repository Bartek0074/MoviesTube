import React, { useEffect, useState } from 'react';
import { Sidebar, Videos } from './index';
import '../styles/Feed.scss';
import { fetchFromAPI } from '../utils/fetchFromAPI';

export default function Feed() {
	const [selectedCategory, setSelectedCategory] = useState('New');
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
			setVideos(data.items).catch(err => console.log(err))
		);
	}, [selectedCategory]);

	return (
		<div className='feed'>
			<Sidebar
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<div className='feed__videos'>
				<p className='feed__videos-title'>
					<span>{selectedCategory}</span> videos
				</p>
				<Videos videos={videos} />
			</div>
		</div>
	);
}
