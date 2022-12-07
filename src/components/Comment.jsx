import React from 'react';
import {BsDot} from 'react-icons/bs'
import '../styles/Comment.scss';
import {
	AiOutlineLike,
	AiOutlineDislike,
} from 'react-icons/ai';
import { calcDate } from '../utils/calcDate';

export default function Comment({comment}) {
	return (
		<div className='comment'>
			<div className='comment__image'>
				<div
					style={{
						backgroundImage: `url(${comment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl})`,
					}}
					className='comment__image-img'
				></div>
			</div>
			<div className='comment__body'>
				<div className='comment__body-topPanel'>
					<p className='comment__body-topPanel-channelName'>{comment.snippet?.topLevelComment?.snippet?.authorDisplayName}</p>
          <BsDot className='icon'/>
					<p className='comment__body-topPanel-date'>{calcDate(new Date(comment.snippet?.topLevelComment?.snippet?.publishedAt))}</p>
				</div>
				<p className='comment__body-text'>{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</p>
      <div className='comment__body-buttons'>
        <button className='comment__body-buttons-like'><AiOutlineLike className='icon'/>{comment.snippet?.topLevelComment?.snippet?.likeCount}</button>
        <button className='comment__body-buttons-dislike'><AiOutlineDislike className='icon'/></button>
      </div>
			</div>
		</div>
	);
}
