import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle } from 'react-icons/ai';
import '../styles/ChannelCard.scss';

export default function ChannelCard({ video }) {
	return (
		<div className='channelCard'>
			<Link to={`/channel/${video.id.channelId}`} className='channelCard__img'>
				<div
					className='channelCard__img-image'
					style={{
						backgroundImage: `url(${video.snippet.thumbnails.medium.url})`,
					}}
				></div>
			</Link>
			<Link
				to={`/channel/${video.id.channelId}`}
				className='channelCard__title'
			>
				<p>{video.snippet.title} </p>
				<AiFillCheckCircle />
			</Link>
		</div>
	);
}
