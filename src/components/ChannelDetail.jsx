import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { numFormatter } from '../utils/numFormatter.js';
import { BsDot } from 'react-icons/bs';
import '../styles/ChannelDetail.scss';

export default function ChannelDetail() {
	const { id } = useParams();
	const [channelDetail, setChannelDetail] = useState(null);
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
			setChannelDetail(data.items[0])
		);

		fetchFromAPI(`search?part=snippet&order=date&channelId=${id}`).then(
			(data) => setVideos(data.items)
		);
	}, [id]);

	console.log(channelDetail);
	// console.log(videos);
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
		</div>
	);
}
