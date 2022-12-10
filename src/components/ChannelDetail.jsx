import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Videos } from './index.js';

import { fetchFromAPI } from '../utils/fetchFromAPI.js';
import { numFormatter } from '../utils/numFormatter.js';

import { BsDot } from 'react-icons/bs';
import { BiGlobe, BiInfoCircle, BiStats } from 'react-icons/bi';
import '../styles/ChannelDetail.scss';

export default function ChannelDetail() {
	const { id } = useParams();

	const [channelDetail, setChannelDetail] = useState(null);
	const [videos, setVideos] = useState([]);
	const [activeModul, setActiveModul] = useState('videos');

	useEffect(() => {
		fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
			setChannelDetail(data.items[0])
		);
		fetchFromAPI(`search?part=snippet&order=date&channelId=${id}`).then(
			(data) => {
				setVideos(data.items);
			}
		);
	}, [id]);

	return (
		<div className='channel-detail'>
			{channelDetail?.brandingSettings?.image?.bannerExternalUrl ? (
				<div
					className='channel-detail__bannerImage'
					style={{
						backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
					}}
				></div>
			) : null}
			<div className='channel-detail__details'>
				<div className='channel-detail__first-box'>
					<div className='channel-detail__thumbnail'>
						<div
							className='channel-detail__thumbnail-image'
							style={{
								backgroundImage: `url(${channelDetail?.snippet?.thumbnails?.medium?.url})`,
							}}
						></div>
					</div>
					<div className='channel-detail__first-box-info'>
						<h2 className='channel-detail__title'>
							{channelDetail?.snippet?.title}
						</h2>
						<div className='channel-detail__stats'>
							<span className='channel-detail__stats-element'>@{channelDetail?.snippet?.title}</span>
							<BsDot className='icon' />
							<span className='channel-detail__stats-element'>
								{numFormatter(channelDetail?.statistics?.subscriberCount)}{' '}
								subscribers
							</span>
							<BsDot className='icon' />
							<span className='channel-detail__stats-element'>{channelDetail?.statistics?.videoCount} videos</span>
						</div>
					</div>
				</div>

				<div className='channel-detail__second-box'>
					<div className='channel-detail__buttons'>
						<button className='channel-detail__sub-btn'>
							Subscribe
						</button>
						<button className='channel-detail__join-btn'>
							Join
						</button>
					</div>
				</div>
			</div>

			<div className='channel-detail__options'>
				<button
					className={
						activeModul === 'videos'
							? 'channel-detail__option channel-detail__option--active'
							: 'channel-detail__option'
					}
					onClick={() => setActiveModul('videos')}
				>
					Videos
				</button>
				<button
					className={
						activeModul === 'about'
							? 'channel-detail__option channel-detail__option--active'
							: 'channel-detail__option'
					}
					onClick={() => setActiveModul('about')}
				>
					About
				</button>
			</div>

			<div
				className='channel-detail__about'
				style={{ display: activeModul === 'about' ? 'block' : 'none' }}
			>
				<div className='channel-detail__description'>
					<p className='channel-detail__description-title'>Description</p>
					<p className='channel-detail__description-text'>
						{channelDetail?.snippet?.description}
					</p>
				</div>
				<div className='channel-detail__info'>
					<p className='channel-detail__info-title'>Details</p>
					<div className='channel-detail__info-element'>
						<BiGlobe className='icon' />
						<p>
							Location:{' '}
							{channelDetail?.snippet?.country
								? channelDetail?.snippet?.country
								: '-'}
						</p>
					</div>
					<div className='channel-detail__info-element'>
						<BiInfoCircle className='icon' />
						<p>Joined: {channelDetail?.snippet?.publishedAt.slice(0, 10)}</p>
					</div>
					<div className='channel-detail__info-element'>
						<BiStats className='icon' />
						<p>{numFormatter(channelDetail?.statistics?.viewCount)} views</p>
					</div>
				</div>
			</div>
			<div
				className='channel-detail__videos'
				style={{ display: activeModul === 'videos' ? 'block' : 'none' }}
			>
				{videos[0] ? (
					<Videos videos={videos} />
				) : (
					<p className='channel-detail__videos-info'>
						This channel doesn't have any content
					</p>
				)}
			</div>
		</div>
	);
}
