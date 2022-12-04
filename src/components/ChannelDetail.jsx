import React, { useEffect, useState } from 'react';
import Videos from './Videos';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
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
			(data) => setVideos(data.items)
		);
	}, [id]);

	// console.log(channelDetail);
	console.log(videos);
	return (
		<div className='channelDetail'>
			<div
				className='channelDetail__bannerImage'
				style={{
					backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
				}}
			></div>
			<div className='channelDetail__details'>
				<div className='channelDetail__details-first-box'>
					<div className='channelDetail__details-first-box-thumbnail'>
						<div
							className='channelDetail__details-first-box-thumbnail-image'
							style={{
								backgroundImage: `url(${channelDetail?.snippet?.thumbnails?.medium?.url})`,
							}}
						></div>
					</div>
					<div className='channelDetail__details-first-box-info'>
						<h2 className='channelDetail__details-first-box-info-title'>
							{channelDetail?.snippet?.title}
						</h2>
						<div className='channelDetail__details-first-box-info-stats'>
							<span>@{channelDetail?.snippet?.title}</span>
							<BsDot className='icon' />
							<span>
								{numFormatter(channelDetail?.statistics?.subscriberCount)}{' '}
								subscribers
							</span>
							<BsDot className='icon' />
							<span>{channelDetail?.statistics?.videoCount} videos</span>
						</div>
					</div>
				</div>

				<div className='channelDetail__details-second-box'>
					<div className='channelDetail__details-second-box-buttons'>
						<button className='channelDetail__details-second-box-buttons-sub'>
							Subscribe
						</button>
						<button className='channelDetail__details-second-box-buttons-join'>
							Join
						</button>
					</div>
				</div>
			</div>

			<div className='channelDetail__buttons'>
				<button
					className={
						activeModul === 'videos'
							? 'channelDetail__buttons-button channelDetail__buttons-button--active'
							: 'channelDetail__buttons-button'
					}
					onClick={() => setActiveModul('videos')}
				>
					Videos
				</button>
				<button
					className={
						activeModul === 'about'
							? 'channelDetail__buttons-button channelDetail__buttons-button--active'
							: 'channelDetail__buttons-button'
					}
					onClick={() => setActiveModul('about')}
				>
					About
				</button>
			</div>

			<div
				className='channelDetail__about'
				style={{ display: activeModul === 'about' ? 'block' : 'none' }}
			>
				<div className='channelDetail__about-description'>
					<p className='channelDetail__about-description-title'>Description</p>
					<p className='channelDetail__about-description-text'>
						{channelDetail?.snippet?.description}
					</p>
				</div>
				<div className='channelDetail__about-info'>
					<p className='channelDetail__about-info-title'>Details</p>
					<div className='channelDetail__about-info-country'>
						<BiGlobe className='icon' />
						<p>Location: {channelDetail?.snippet?.country}</p>
					</div>
					<div className='channelDetail__about-info-joined'>
						<BiInfoCircle className='icon' />
						<p>Joined: {channelDetail?.snippet?.publishedAt.slice(0, 10)}</p>
					</div>
					<div className='channelDetail__about-info-views'>
						<BiStats className='icon' />
						<p>{numFormatter(channelDetail?.statistics?.viewCount)} views</p>
					</div>
				</div>
			</div>
			<div className='channelDetail__videos' style={{display: activeModul === 'videos' ? 'block' : 'none' }}>
				<Videos videos={videos}/>
			</div>
		</div>
	);
}
