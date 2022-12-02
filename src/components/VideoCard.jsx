import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle } from 'react-icons/ai';
import '../styles/VideoCard.scss';

export default function VideoCard({ video }) {
  
	return (
		<div className='videoCard'>
			<Link to={`/video/${video.id.videoId}`} className='videoCard__img'>
				<div
					className='videoCard__img-image'
					style={{
						backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
					}}
				></div>
				<div className='videoCard__img-shadow'></div>
			</Link>
			<Link to={`/video/${video.id.videoId}`} className='videoCard__title'>
				<p>{video.snippet.title}</p>
			</Link>
			<Link
				to={`/channel/${video.snippet.channelId}`}
				className='videoCard__channel'
			>
				<p>{video.snippet.channelTitle}</p>
				<AiFillCheckCircle />
			</Link>
		</div>
	);
}
