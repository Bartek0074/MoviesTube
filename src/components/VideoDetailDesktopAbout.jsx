import React from 'react';
import { useState } from 'react';
import '../styles/VideoDetailDesktopAbout.scss';
import { numFormatter } from '../utils/numFormatter';
import { calcDate } from '../utils/calcDate';

export default function VideoDetailDesktopAbout({ videoDetail }) {
	const [isAboutOpen, setIsAboutOpen] = useState(false);

	const handleClick = () => {
		setIsAboutOpen(!isAboutOpen);
	};

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

	return (
		<>
			{isAboutOpen ? (
				<div className='videoDetailDesktopAbout videoDetailDesktopAbout--close'>
					<div className='videoDetailDesktopAbout__stats'>
						<p className='videoDetailDesktopAbout__stats-views'>
							{videoDetail?.statistics?.viewCount
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
							views
						</p>
						<p className='videoDetailDesktopAbout__stats-date'>
							{
								monthNames[
									new Date(videoDetail?.snippet?.publishedAt).getMonth()
								]
							}{' '}
							{new Date(videoDetail?.snippet?.publishedAt).getDate()}
							{', '}
							{new Date(videoDetail?.snippet?.publishedAt)
								.getFullYear()
								.toString()}
						</p>
					</div>
					<p className='videoDetailDesktopAbout__description'>
						{videoDetail?.snippet?.description}
					</p>
					<button
						onClick={handleClick}
						className='videoDetailDesktopAbout__stats-less'
					>
						Show less
					</button>
				</div>
			) : (
				<div
					onClick={handleClick}
					className='videoDetailDesktopAbout videoDetailDesktopAbout--open'
				>
					<div className='videoDetailDesktopAbout__stats'>
						<p className='videoDetailDesktopAbout__stats-views'>
							{numFormatter(videoDetail?.statistics?.viewCount)} views
						</p>
						<p className='videoDetailDesktopAbout__stats-date'>
							{calcDate(new Date(videoDetail?.snippet?.publishedAt))}
						</p>
					</div>
					<p className='videoDetailDesktopAbout__description'>
						{videoDetail?.snippet?.description?.substring(0, 250) + '...'}
					</p>
					<p className='videoDetailDesktopAbout__stats-more'>Show more</p>
				</div>
			)}
		</>
	);
}
