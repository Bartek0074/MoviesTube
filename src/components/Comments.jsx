import React, { useState } from 'react';

import { Comment } from './index.js';

import '../styles/Comments.scss';

export default function Comments({ comments }) {
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
			{comments.map((comment, id) => {
				if (id < numberOfComments) {
					return <Comment comment={comments[id]} key={id} />;
				} else return null;
			})}

			{numberOfComments < comments.length ? (
				<button className='comments__button' onClick={showMoreComments}>
					Show more
				</button>
			) : null}
		</div>
	);
}
