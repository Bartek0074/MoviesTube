import React from 'react';
import { useNavigate } from 'react-router-dom';

import { numFormatter } from '../utils/numFormatter.js';
import { monthNames } from '../utils/constants.js';

import '../styles/VideoDetailMobileAbout.scss';

export default function VideoDetailMobileAbout({ channelDetail, videoDetail }) {
	const navigate = useNavigate();
	const navigateToChannel = () => {
		navigate(`/channel/${videoDetail?.snippet?.channelId}`);
	};

	return (
		<div className='video-detail-mobile-about'>
			<p className='video-detail-mobile-about__title'>
				{videoDetail?.snippet?.title}
			</p>
			<div className='video-detail-mobile-about__stats'>
				<div className='video-detail-mobile-about__stat'>
					<p className='video-detail-mobile-about__value'>
						{videoDetail?.statistics?.likeCount
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
					</p>
					<p className='video-detail-mobile-about__label'>likes</p>
				</div>
				<div className='video-detail-mobile-about__stat'>
					<p className='video-detail-mobile-about__value'>
						{videoDetail?.statistics?.viewCount
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
					</p>
					<p className='video-detail-mobile-about__label'>views</p>
				</div>
				<div className='video-detail-mobile-about__stat'>
					<p className='video-detail-mobile-about__value'>
						{new Date(videoDetail?.snippet?.publishedAt).getDate()}{' '}
						{monthNames[new Date(videoDetail?.snippet?.publishedAt).getMonth()]}
					</p>
					<p className='video-detail-mobile-about__label'>
						{new Date(videoDetail?.snippet?.publishedAt)
							.getFullYear()
							.toString()}
					</p>
				</div>
			</div>
			<p className='video-detail-mobile-about__description'>
				{videoDetail?.snippet?.description}
			</p>
			<div
				className='video-detail-mobile-about__channel'
				onClick={navigateToChannel}
			>
				<div
					className='video-detail-mobile-about__channel-image'
					style={{
						backgroundImage: `url(${channelDetail?.snippet?.thumbnails?.default?.url})`,
					}}
				></div>
				<div className='video-detail-mobile-about__channel-info'>
					<p className='video-detail-mobile-about__channel-name'>
						{channelDetail?.snippet?.title}
					</p>
					<p className='video-detail-mobile-about__subs'>
						{numFormatter(channelDetail?.statistics?.subscriberCount)}{' '}
						subscribers
					</p>
				</div>
			</div>
		</div>
	);
}
