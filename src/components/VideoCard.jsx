import React from 'react';
import { Link } from 'react-router-dom';

import { BsDot } from 'react-icons/bs';

import { calcDate } from '../utils/calcDate.js';

import '../styles/VideoCard.scss';

export default function VideoCard({ video }) {
	return (
		<div className='video-card'>
			<Link to={`/video/${video.id.videoId}`} className='video-card__link-img'>
				<div
					className='video-card__img'
					style={{
						backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
					}}
				></div>
				<div className='video-card__img-shadow'></div>
			</Link>
			<Link to={`/video/${video.id.videoId}`} className='video-card__title'>
				<p>{video.snippet.title}</p>
			</Link>
			<div className='video-card__info'>
				<Link
					to={`/channel/${video.snippet.channelId}`}
					className='video-card__channel-name'
				>
					<p>{video.snippet.channelTitle}</p>
				</Link>
				<BsDot className='icon' />
				<p>{calcDate(new Date(video.snippet.publishTime))}</p>
			</div>
		</div>
	);
}
