import React from 'react';
import { useState } from 'react';

import { numFormatter } from '../utils/numFormatter.js';
import { calcDate } from '../utils/calcDate.js';
import { monthNames } from '../utils/constants.js';

import '../styles/VideoDetailDesktopAbout.scss';

export default function VideoDetailDesktopAbout({ videoDetail }) {
	const [isAboutOpen, setIsAboutOpen] = useState(false);

	const handleClick = () => {
		setIsAboutOpen(!isAboutOpen);
	};

	return (
		<>
			{isAboutOpen ? (
				<div className='video-detail-desktop-about video-detail-desktop-about--close'>
					<div className='video-detail-desktop-about__stats'>
						<p className='video-detail-desktop-about__views'>
							{videoDetail?.statistics?.viewCount
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
							views
						</p>
						<p className='video-detail-desktop-about__date'>
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
					<p className='video-detail-desktop-about__description'>
						{videoDetail?.snippet?.description}
					</p>
					<button
						className='video-detail-desktop-about__less-btn'
						onClick={handleClick}
					>
						Show less
					</button>
				</div>
			) : (
				<div
					onClick={handleClick}
					className='video-detail-desktop-about video-detail-desktop-about--open'
				>
					<div className='video-detail-desktop-about__stats'>
						<p className='video-detail-desktop-about__views'>
							{numFormatter(videoDetail?.statistics?.viewCount)} views
						</p>
						<p className='video-detail-desktop-about__date'>
							{calcDate(new Date(videoDetail?.snippet?.publishedAt))}
						</p>
					</div>
					<p className='video-detail-desktop-about__description'>
						{videoDetail?.snippet?.description?.substring(0, 250) + '...'}
					</p>
					<p className='video-detail-desktop-about__more'>Show more</p>
				</div>
			)}
		</>
	);
}
