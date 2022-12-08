import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import '../styles/VideoDetail.scss';
import { numFormatter } from '../utils/numFormatter';
import { calcDate } from '../utils/calcDate';
import Comments from './Comments';
import {
	AiOutlineLike,
	AiOutlineDislike,
	AiOutlineShareAlt,
	AiOutlineDownload,
	AiOutlinePlusSquare,
	AiOutlineClose,
} from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import Videos from './Videos';
import VideoDetailMobileAbout from './VideoDetailMobileAbout';
import LoadingSpinner from './LoadingSpinner';

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

	// console.log(comments[0]?.snippet?.topLevelComment?.snippet?.textDisplay);
	// console.log(
	// 	comments[0]?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
	// );

	return (
		<div
			className='videoDetail'
			style={
				isCommentMobileDisplayed || isAboutMobileDisplayed
					? { overflow: 'hidden' }
					: { overflow: 'scroll' }
			}
		>
			{/* Video player */}
			<div className='videoDetail__video-wrapper'>
				<ReactPlayer
					className='videoDetail__video'
					url={`https://www.youtube.com/watch?v=${id}`}
					width='100%'
					height='100%'
					controls
				/>
			</div>

			{/* Video details */}
			<div className='videoDetail__details'>
				{videoDetail && channelDetail ? (
					<>
						<h2 className='videoDetail__details-title'>
							{videoDetail?.snippet?.title}
						</h2>

						{/* Mobile about opener */}
						<div
							onClick={() => setIsAboutMobileDisplayed(true)}
							className='videoDetail__details-info-mobile'
						>
							<p className='videoDetail__details-info-mobile-views'>
								{numFormatter(videoDetail?.statistics?.viewCount)} views
							</p>
							<p className='videoDetail__details-info-mobile-date'>
								{calcDate(new Date(videoDetail?.snippet?.publishedAt))}
							</p>
							<p className='videoDetail__details-info-mobile-more'>
								...show more
							</p>
						</div>

						{/* Channel details, buttons etc. (mobile + desktop) */}
						<div className='videoDetail__details-channel'>
							<div className='videoDetail__details-channel-info'>
								<div
									onClick={navigateToChannel}
									className='videoDetail__details-channel-info-image'
									style={{
										backgroundImage: `url(${channelDetail?.snippet?.thumbnails?.default?.url})`,
									}}
								></div>
								<div
									onClick={navigateToChannel}
									className='videoDetail__details-channel-info-name'
								>
									<p className='videoDetail__details-channel-info-name-title'>
										{channelDetail?.snippet?.title}
									</p>
									<p className='videoDetail__details-channel-info-name-subscribers'>
										{numFormatter(channelDetail?.statistics?.subscriberCount)}{' '}
									</p>
								</div>
								<button className='videoDetail__details-channel-info-name-subscribe-button'>
									Subscribe
								</button>
							</div>
							<div className='videoDetail__details-channel-buttons'>
								<div className='videoDetail__details-channel-buttons-likes'>
									<button className='videoDetail__details-channel-buttons-likes-like'>
										<AiOutlineLike className='icon' />
										{numFormatter(videoDetail?.statistics?.likeCount)}
									</button>
									<button className='videoDetail__details-channel-buttons-likes-dislike'>
										<AiOutlineDislike />
									</button>
								</div>
								<button className='videoDetail__details-channel-buttons-share'>
									<AiOutlineShareAlt className='icon' /> Share
								</button>
								<button className='videoDetail__details-channel-buttons-download'>
									<AiOutlineDownload className='icon' /> Download
								</button>
								<button className='videoDetail__details-channel-buttons-save'>
									<AiOutlinePlusSquare className='icon' /> Save
								</button>
							</div>
						</div>
					</>
				) : (
					<LoadingSpinner />
				)}
			</div>

			{/* Comments dekstop */}
			<div className='videoDetail__comments-dekstop'>
				<Comments
					comments={comments}
					setIsCommentMobileDisplayed={setIsCommentMobileDisplayed}
				/>
			</div>

			{/* Comments box opener (only mobile) */}
			<div
				onClick={() => setIsCommentMobileDisplayed(true)}
				className='videoDetail__mobileCommentOpener'
			>
				{comments[0] ? (
					<>
						<p className='videoDetail__mobileCommentOpener-commentCount'>
							Comments <span>{videoDetail?.statistics?.commentCount}</span>
						</p>
						<div className='videoDetail__mobileCommentOpener-comment'>
							<div
								className='videoDetail__mobileCommentOpener-comment-image'
								style={{
									backgroundImage: `url(${comments[0]?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl})`,
								}}
							></div>
							<p className='videoDetail__mobileCommentOpener-comment-text'>
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
						? 'videoDetail__comments-mobile videoDetail__comments-mobile--active'
						: 'videoDetail__comments-mobile'
				}
			>
				<div className='videoDetail__comments-mobile-topPanel'>
					<p className='videoDetail__comments-mobile-topPanel-title'>Comments</p>
					<button
						onClick={() => {
							setIsCommentMobileDisplayed(false);
						}}
						className='videoDetail__comments-mobile-topPanel-button'
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
						? 'videoDetail__about-mobile videoDetail__about-mobile--active'
						: 'videoDetail__about-mobile'
				}
			>
				<VideoDetailMobileAbout
					videoDetail={videoDetail}
					channelDetail={channelDetail}
					setIsAboutMobileDisplayed={setIsAboutMobileDisplayed}
				/>
			</div>

			{/* Videos */}
			<div className='videoDetail__videos'>
				{videos ? <Videos videos={videos} /> : <LoadingSpinner />}
			</div>
		</div>
	);
}
