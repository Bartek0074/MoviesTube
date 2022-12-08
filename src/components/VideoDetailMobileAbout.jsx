import React from 'react';
import { useNavigate } from 'react-router-dom';
import { numFormatter } from '../utils/numFormatter';
import '../styles/VideoDetailMobileAbout.scss';

export default function VideoDetailMobileAbout({ channelDetail, videoDetail, setIsAboutMobileDisplayed }) {
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const navigate = useNavigate();
	const navigateToChannel = () => {
		navigate(`/channel/${videoDetail?.snippet?.channelId}`);
	};
	return (
		<div className='videoDetailMobileAbout'>
			<p className='videoDetailMobileAbout__title'>
				{videoDetail?.snippet?.title}
			</p>
			<div className='videoDetailMobileAbout__stats'>
				<div className='videoDetailMobileAbout__stats-stat'>
					<p className='videoDetailMobileAbout__stats-stat-value'>
						{videoDetail?.statistics?.likeCount
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
					</p>
					<p className='videoDetailMobileAbout__stats-stat-label'>likes</p>
				</div>
				<div className='videoDetailMobileAbout__stats-stat'>
					<p className='videoDetailMobileAbout__stats-stat-value'>
						{videoDetail?.statistics?.viewCount
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
					</p>
					<p className='videoDetailMobileAbout__stats-stat-label'>views</p>
				</div>
				<div className='videoDetailMobileAbout__stats-stat'>
					<p className='videoDetailMobileAbout__stats-stat-value'>
						{new Date(videoDetail?.snippet?.publishedAt).getDate()}{' '}
						{monthNames[new Date(videoDetail?.snippet?.publishedAt).getMonth()]}
					</p>
					<p className='videoDetailMobileAbout__stats-stat-label'>
						{new Date(videoDetail?.snippet?.publishedAt)
							.getFullYear()
							.toString()}
					</p>
				</div>
			</div>
			<p className='videoDetailMobileAbout__description'>
				{videoDetail?.snippet?.description}
			</p>
			<div
				onClick={navigateToChannel}
				className='videoDetailMobileAbout__channel'
			>
				<div
					className='videoDetailMobileAbout__channel-image'
					style={{
						backgroundImage: `url(${channelDetail?.snippet?.thumbnails?.default?.url})`,
					}}
				></div>
				<div className='videoDetailMobileAbout__channel-info'>
					<p className='videoDetail__about-mobile-channel-info-title'>
						{channelDetail?.snippet?.title}
					</p>
					<p className='videoDetailMobileAbout__channel-info-subscribers'>
						{numFormatter(channelDetail?.statistics?.subscriberCount)}{' '}
						subscribers
					</p>
				</div>
			</div>
		</div>
	);
}
