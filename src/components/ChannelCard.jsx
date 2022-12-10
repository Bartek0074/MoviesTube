import React from 'react';
import { Link } from 'react-router-dom';

import { AiFillCheckCircle } from 'react-icons/ai';

import '../styles/ChannelCard.scss';

export default function ChannelCard({ video }) {
	return (
		<div className='channel-card'>
			<Link to={`/channel/${video.id.channelId}`} className='channel-card__link-img'>
				<div
					className='channel-card__img'
					style={{
						backgroundImage: `url(${video.snippet.thumbnails.medium.url})`,
					}}
				></div>
			</Link>
			<Link
				to={`/channel/${video.id.channelId}`}
				className='channel-card__link-title'
			>
				<p className='channel-card__title'>{video.snippet.title} </p>
				<AiFillCheckCircle className='channel-card__icon' />
			</Link>
		</div>
	);
}
