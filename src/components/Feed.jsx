import React, { useEffect, useState } from 'react';

import { Sidebar, Videos, LoadingSpinner } from './index';

import { fetchFromAPI } from '../utils/fetchFromAPI';

import '../styles/Feed.scss';

export default function Feed() {
	const [selectedCategory, setSelectedCategory] = useState('New');
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
			setVideos(data.items)
		);
	}, [selectedCategory]);

	return (
		<div className='feed'>
			<div className='feed__sidebar'>
				<Sidebar
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
			</div>
			<div className='feed__videos'>
				<p className='feed__videos-title'>
					<span>{selectedCategory}</span> videos
				</p>
				{videos[0] ? <Videos videos={videos} /> : <LoadingSpinner />}
			</div>
		</div>
	);
}
