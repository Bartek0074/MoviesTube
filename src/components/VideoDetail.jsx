import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import '../styles/VideoDetail.scss';
import { numFormatter } from '../utils/numFormatter';
import { calcDate } from '../utils/calcDate';
import {
	AiOutlineClose,
	AiOutlineLike,
	AiOutlineDislike,
	AiOutlineShareAlt,
	AiOutlineDownload,
	AiOutlinePlusSquare,
} from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';

export default function VideoDetail() {
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
	const { id } = useParams();

	const navigate = useNavigate();

	const [videoDetail, setVideoDetail] = useState(null);
	const [channelDetail, setChannelDetail] = useState(null);
	const [comments, setComments] = useState([]);

	const [isAboutMobileDisplayed, setIsAboutMobileDisplayed] = useState(false);
	const [isCommentMobileDisplayed, setIsCommentMobileDisplayed] =
		useState(false);

	const navigateToChannel = () => {
		navigate(`/channel/${videoDetail?.snippet?.channelId}`);
	};

	useState(() => {
		fetchFromAPI(`videos?part=snippet&id=${id}`).then((data) => {
			setVideoDetail(data?.items[0]);
			fetchFromAPI(
				`channels?part=snippet&id=${data?.items[0]?.snippet?.channelId}`
			).then((data) => setChannelDetail(data.items[0]));
		});
		setTimeout(() => {
			fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`).then((data) =>
				setComments(data.items)
			);
		}, 1000);
	}, [id]);

	console.log(comments[0]?.snippet?.topLevelComment?.snippet?.textDisplay);
	console.log(
		comments[0]?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
	);

	return (
		<div className='videoDetail'>
			<div className='videoDetail__video-wrapper'>
				<ReactPlayer
					className='videoDetail__video'
					url={`https://www.youtube.com/watch?v=${id}`}
					width='100%'
					height='100%'
					controls
				/>
			</div>
			<div
			onClick={() => setIsCommentMobileDisplayed(false)}
				className={
					isCommentMobileDisplayed
						? 'videoDetail__comments-mobile videoDetail__comments-mobile--active'
						: 'videoDetail__comments-mobile'
				}
			></div>
			<div
				className={
					isAboutMobileDisplayed
						? 'videoDetail__about-mobile videoDetail__about-mobile--active'
						: 'videoDetail__about-mobile'
				}
			>
				<div className='videoDetail__about-mobile-first-box'>
					<p className='videoDetail__about-mobile-first-box-title'>About</p>
					<button
						onClick={() => {
							setIsAboutMobileDisplayed(false);
						}}
						className='videoDetail__about-mobile-first-box-button'
					>
						<AiOutlineClose />
					</button>
				</div>
				<p className='videoDetail__about-mobile-title'>
					{videoDetail?.snippet?.title}
				</p>
				<div className='videoDetail__about-mobile-stats'>
					<div className='videoDetail__about-mobile-stats-stat'>
						<p className='videoDetail__about-mobile-stats-stat-value'>
							{videoDetail?.statistics?.likeCount
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
						</p>
						<p className='videoDetail__about-mobile-stats-stat-label'>likes</p>
					</div>
					<div className='videoDetail__about-mobile-stats-stat'>
						<p className='videoDetail__about-mobile-stats-stat-value'>
							{videoDetail?.statistics?.viewCount
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
						</p>
						<p className='videoDetail__about-mobile-stats-stat-label'>views</p>
					</div>
					<div className='videoDetail__about-mobile-stats-stat'>
						<p className='videoDetail__about-mobile-stats-stat-value'>
							{new Date(videoDetail?.snippet?.publishedAt).getDate()}{' '}
							{
								monthNames[
									new Date(videoDetail?.snippet?.publishedAt).getMonth()
								]
							}
						</p>
						<p className='videoDetail__about-mobile-stats-stat-label'>
							{new Date(videoDetail?.snippet?.publishedAt)
								.getFullYear()
								.toString()}
						</p>
					</div>
				</div>
				<p className='videoDetail__about-mobile-description'>
					{videoDetail?.snippet?.description}
				</p>
				<div
					onClick={navigateToChannel}
					className='videoDetail__about-mobile-channel'
				>
					<div
						className='videoDetail__about-mobile-channel-image'
						style={{
							backgroundImage: `url(${channelDetail?.snippet?.thumbnails?.default?.url})`,
						}}
					></div>
					<div className='videoDetail__about-mobile-channel-info'>
						<p className='videoDetail__about-mobile-channel-info-title'>
							{channelDetail?.snippet?.title}
						</p>
						<p className='videoDetail__about-mobile-channel-info-subscribers'>
							{numFormatter(channelDetail?.statistics?.subscriberCount)}{' '}
							subscribers
						</p>
					</div>
				</div>
			</div>
			<div className='videoDetail__details'>
				<h2 className='videoDetail__details-title'>
					{videoDetail?.snippet?.title}
				</h2>
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
					<p className='videoDetail__details-info-mobile-more'>...show more</p>
				</div>
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
			</div>
			<div onClick={() => setIsCommentMobileDisplayed(true)} className='videoDetail__mobileCommentOpener'>
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
			</div>
		</div>
	);
}
