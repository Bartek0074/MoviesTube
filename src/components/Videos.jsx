import React from 'react';
import '../styles/Videos.scss';
import { VideoCard, ChannelCard } from './index';
export default function Videos(props) {
	const { videos } = props;
	const filteredVideos = videos.filter(video => {
		return video.id.playlistId == null
	})
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
