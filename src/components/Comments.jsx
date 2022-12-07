import React, { useState } from 'react';
import Comment from './Comment';
import '../styles/Comments.scss';
import { AiOutlineClose } from 'react-icons/ai';

export default function Comments({ setIsCommentMobileDisplayed, comments }) {
	const [numberOfComments, setNumberOfComments] = useState(10);

	const showMoreComments = () => {
		if (numberOfComments + 10 <= comments.length) {
			setNumberOfComments(numberOfComments + 10);
		} else if (numberOfComments + 10 > comments.length) {
			setNumberOfComments(comments.length);
		}
	};

	return (
		<div className='comments'>
			<div className='comments__topPanel'>
				<p className='comments__topPanel-title'>Comments</p>
				<button
					onClick={() => {
						setIsCommentMobileDisplayed(false);
					}}
					className='comments__topPanel-button'
				>
					<AiOutlineClose />
				</button>
			</div>

			{comments.map((comment, id) => {
				if (id < numberOfComments) {
					return <Comment comment={comments[id]} key={id} />;
				} else return null;
			})}

			{/* {commentArray.map((comment, id) => {
				if (id < numberOfComments) {
					return <Comment key={id}/>;
				} else return null;
			})} */}

			{numberOfComments !== comments.length ? (
				<button className='comments__button' onClick={showMoreComments}>
					Show more
				</button>
			) : null}
		</div>
	);
}
