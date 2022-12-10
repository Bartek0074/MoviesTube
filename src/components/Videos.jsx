import React from 'react';

import { VideoCard, ChannelCard } from './index';

import '../styles/Videos.scss';

export default function Videos({ videos }) {
	const filteredVideos = videos.filter((video) => {
		return video.id.playlistId == null;
	});

	return (
		<div className='videos'>
			{filteredVideos.map((video, id) => (
				<div key={id} className='videos__card'>
					{video.id.videoId && <VideoCard video={video} />}
					{video.id.channelId && <ChannelCard video={video} />}
				</div>
			))}
		</div>
	);
}
