import React from 'react';
import { Link } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { calcDate } from '../utils/calcDate.js';
import '../styles/VideoCard.scss';

export default function VideoCard({ video }) {
	const date = new Date(video.snippet.publishTime);

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
			<div className='videoCard__info'>
				<Link
					to={`/channel/${video.snippet.channelId}`}
					className='videoCard__info-channel'
				>
					<p>{video.snippet.channelTitle}</p>
				</Link>
				<BsDot className='icon' />
				<p className='videoCard__info-date'>{calcDate(date)}</p>
			</div>
		</div>
	);
}
