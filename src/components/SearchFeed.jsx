import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Videos, LoadingSpinner } from './index';

import { fetchFromAPI } from '../utils/fetchFromAPI';

import '../styles/SearchFeed.scss';

export default function SearchFeed() {
	const { searchTerm } = useParams();

	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
			setVideos(data.items)
		);
	}, [searchTerm]);

	return (
		<div className='search-feed'>
			<p className='search-feed__title'>
				Search results for <span className='search-feed__search-term'>{searchTerm}</span> videos
			</p>
			{videos[0] ? <Videos videos={videos} /> : <LoadingSpinner />}
		</div>
	);
}
