import React from 'react';
import { useNavigate } from 'react-router-dom';

import { calcDate } from '../utils/calcDate';

import { BsDot } from 'react-icons/bs';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

import '../styles/Comment.scss';

export default function Comment({ comment }) {
	const navigate = useNavigate();

	const navigateToChannel = (id) => {
		navigate(`/channel/${id}`);
	};

	return (
		<div className='comment'>
			<div className='comment__image'>
				<div
					className='comment__channel-image'
					style={{
						backgroundImage: `url(${comment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl})`,
					}}
					onClick={() =>
						navigateToChannel(
							comment.snippet?.topLevelComment?.snippet?.authorChannelId?.value
						)
					}
				></div>
			</div>
			<div className='comment__body'>
				<div className='comment__body-top-panel'>
					<p
						className='comment__channel-name'
						onClick={() =>
							navigateToChannel(
								comment.snippet?.topLevelComment?.snippet?.authorChannelId
									?.value
							)
						}
					>
						{comment.snippet?.topLevelComment?.snippet?.authorDisplayName}
					</p>
					<BsDot className='icon' />
					<p className='comment__date'>
						{calcDate(
							new Date(comment.snippet?.topLevelComment?.snippet?.publishedAt)
						)}
					</p>
				</div>
				<p className='comment__text'>
					{comment?.snippet?.topLevelComment?.snippet?.textDisplay}
				</p>
				<div className='comment__buttons'>
					<button className='comment__like-btn'>
						<AiOutlineLike className='icon' />
						{comment.snippet?.topLevelComment?.snippet?.likeCount}
					</button>
					<button className='comment__dislike-btn'>
						<AiOutlineDislike className='icon' />
					</button>
				</div>
			</div>
		</div>
	);
}
