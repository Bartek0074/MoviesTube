import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import ReactPlayer from 'react-player';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { numFormatter } from '../utils/numFormatter';
import { calcDate } from '../utils/calcDate';

import VideoDetailDesktopAbout from './VideoDetailDesktopAbout';
import {
	Comments,
	Videos,
	LoadingSpinner,
	VideoDetailMobileAbout,
} from './index';

import {
	AiOutlineLike,
	AiOutlineDislike,
	AiOutlineShareAlt,
	AiOutlineDownload,
	AiOutlinePlusSquare,
	AiOutlineClose,
} from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';

import '../styles/VideoDetail.scss';

export default function VideoDetail() {
	const { id } = useParams();

	const navigate = useNavigate();
	const navigateToChannel = () => {
		navigate(`/channel/${videoDetail?.snippet?.channelId}`);
	};

	const [videoDetail, setVideoDetail] = useState(null);
	const [channelDetail, setChannelDetail] = useState(null);
	const [comments, setComments] = useState([]);
	const [videos, setVideos] = useState(null);

	const [isAboutMobileDisplayed, setIsAboutMobileDisplayed] = useState(false);
	const [isCommentMobileDisplayed, setIsCommentMobileDisplayed] =
		useState(false);

	useEffect(() => {
		setVideoDetail(null);
		setChannelDetail(null);
		setComments([]);
		setVideos(null);

		const fetchData = async () => {
			const videoDetailData = await fetchFromAPI(
				`videos?part=snippet&id=${id}`
			).catch((e) => {
				console.log(e);
			});
			setVideoDetail(videoDetailData.items[0]);

			const channelDetailData = await fetchFromAPI(
				`channels?part=snippet&id=${videoDetailData?.items[0]?.snippet?.channelId}`
			).catch((e) => {
				console.log(e);
			});
			setChannelDetail(channelDetailData.items[0]);

			// there is a setTimeout because of rate limit in API (5 requests/sec)
			setTimeout(async () => {
				const videosData = await fetchFromAPI(
					`search?part=snippet&relatedToVideoId=${id}&type=video`
				).catch((e) => {
					console.log(e);
				});
				setVideos(videosData.items);
			}, 1000);

			setTimeout(async () => {
				const commentsData = await fetchFromAPI(
					`commentThreads?part=snippet&videoId=${id}`
				).catch((e) => {
					console.log(e);
				});
				setComments(commentsData.items);
			}, 2000);
		};

		fetchData();
	}, [id]);

	return (
		<div
			className='video-detail'
			style={
				isCommentMobileDisplayed || isAboutMobileDisplayed
					? { overflow: 'hidden' }
					: { overflow: 'scroll' }
			}
		>
			<div className='video-detail-wrapper'>
				{/* Video player */}
				<div className='video-detail__video-box'>
					<ReactPlayer
						className='video-detail__video'
						url={`https://www.youtube.com/watch?v=${id}`}
						width='100%'
						height='100%'
						controls
					/>
				</div>

				{/* Video details */}
				<div className='video-detail__details'>
					{videoDetail && channelDetail ? (
						<>
							<h2 className='video-detail__title'>
								{videoDetail?.snippet?.title}
							</h2>

							{/* Mobile about opener */}
							<div
								onClick={() => setIsAboutMobileDisplayed(true)}
								className='video-detail__mobile-about-opener'
							>
								<p className='video-detail__views'>
									{numFormatter(videoDetail?.statistics?.viewCount)} views
								</p>
								<p className='video-detail__date'>
									{calcDate(new Date(videoDetail?.snippet?.publishedAt))}
								</p>
								<p className='video-detail__show-more'>...show more</p>
							</div>

							{/* Channel details, buttons etc. (mobile + desktop) */}
							<div className='video-detail__channel'>
								<div className='video-detail__channel-info'>
									<div
										onClick={navigateToChannel}
										className='video-detail__channel-image'
										style={{
											backgroundImage: `url(${channelDetail?.snippet?.thumbnails?.default?.url})`,
										}}
									></div>
									<div
										onClick={navigateToChannel}
										className='video-detail__channel-name'
									>
										<p className='video-detail__channel-title'>
											{channelDetail?.snippet?.title}
										</p>
										<p className='video-detail__channel-subs'>
											{numFormatter(channelDetail?.statistics?.subscriberCount)}{' '}
										</p>
									</div>
									<button className='video-detail__subscribe-btn'>
										Subscribe
									</button>
								</div>
								<div className='video-detail__buttons'>
									<div className='video-detail__likes'>
										<button className='video-detail__like-btn'>
											<AiOutlineLike className='icon' />
											{numFormatter(videoDetail?.statistics?.likeCount)}
										</button>
										<button className='video-detail__dislike-btn'>
											<AiOutlineDislike />
										</button>
									</div>
									<button className='video-detail__share-btn'>
										<AiOutlineShareAlt className='icon' /> Share
									</button>
									<button className='video-detail__download-btn'>
										<AiOutlineDownload className='icon' /> Download
									</button>
									<button className='video-detail__save-btn'>
										<AiOutlinePlusSquare className='icon' /> Save
									</button>
								</div>
							</div>
						</>
					) : (
						<LoadingSpinner />
					)}
				</div>
				<div className='video-detail__desktop-about'>
					{videoDetail ? (
						<VideoDetailDesktopAbout videoDetail={videoDetail} />
					) : (
						<LoadingSpinner />
					)}
				</div>

				{/* Comments dekstop */}
				<div className='video-detail__desktop-comments'>
					{comments[0] ? (
						<Comments
							comments={comments}
							setIsCommentMobileDisplayed={setIsCommentMobileDisplayed}
						/>
					) : (
						<LoadingSpinner />
					)}
				</div>

				{/* Comments box opener (only mobile) */}
				<div
					onClick={() => setIsCommentMobileDisplayed(true)}
					className='video-detail__mobile-comments-opener'
				>
					{comments[0] ? (
						<>
							<p className='video-detail__comments-number'>
								Comments <span>{videoDetail?.statistics?.commentCount}</span>
							</p>
							<div className='video-detail__first-comment'>
								<div
									className='video-detail__comment-image'
									style={{
										backgroundImage: `url(${comments[0]?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl})`,
									}}
								></div>
								<p className='video-detail__comment-text'>
									{comments[0]?.snippet?.topLevelComment?.snippet?.textDisplay.substring(
										0,
										120
									) + '...'}
								</p>
								<IoIosArrowDown className='icon' />
							</div>
						</>
					) : (
						<LoadingSpinner />
					)}
				</div>

				{/* Comments mobile box */}
				<div
					className={
						isCommentMobileDisplayed
							? 'video-detail__mobile-comments video-detail__mobile-comments--active'
							: 'video-detail__mobile-comments'
					}
				>
					<div className='video-detail__comments-mobile-top'>
						<p className='video-detail__comments-mobile-title'>Comments</p>
						<button
							onClick={() => {
								setIsCommentMobileDisplayed(false);
							}}
							className='video-detail__comments-mobile-close-btn'
						>
							<AiOutlineClose />
						</button>
					</div>
					<Comments
						comments={comments}
						setIsCommentMobileDisplayed={setIsCommentMobileDisplayed}
					/>
				</div>

				{/* About video mobile box */}
				<div
					className={
						isAboutMobileDisplayed
							? 'video-detail__mobile-about video-detail__mobile-about--active'
							: 'video-detail__mobile-about'
					}
				>
					<div className='video-detail__about-mobile-top'>
						<p className='video-detail__about-mobile-title'>About</p>
						<button
							onClick={() => {
								setIsAboutMobileDisplayed(false);
							}}
							className='video-detail__about-mobile-close-btn'
						>
							<AiOutlineClose />
						</button>
					</div>
					<VideoDetailMobileAbout
						videoDetail={videoDetail}
						channelDetail={channelDetail}
						setIsAboutMobileDisplayed={setIsAboutMobileDisplayed}
					/>
				</div>

				{/* Videos */}
				<div className='video-detail__videos'>
					{videos ? <Videos videos={videos} /> : <LoadingSpinner />}
				</div>
			</div>
		</div>
	);
}
