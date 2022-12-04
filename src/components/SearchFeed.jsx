import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Videos } from './index';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import '../styles/SearchFeed.scss'

export default function SearchFeed() {
	const { searchTerm } = useParams();

	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
			setVideos(data.items)
		);
	}, [searchTerm]);

	return (
		<div className='searchFeed'>
			<p className='searchFeed__title'>
				Search results for <span>{searchTerm}</span> videos
			</p>
			<Videos videos={videos} />
		</div>
	);
}
