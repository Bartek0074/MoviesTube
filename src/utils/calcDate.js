export function calcDate(datde) {
	const actualDate = new Date();

	const diff = Math.floor(actualDate.getTime() - datde.getTime());
	const minute = 1000 * 60;

	const minutes = Math.floor(diff / minute);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 31);
	const years = Math.floor(months / 12);

	if (years === 1) {
		return '1 year ago';
	} else if (years > 1) {
		return `${years} years ago`;
	} else if (months === 1) {
		return '1 month ago';
	} else if (months > 1) {
		return `${months} months ago`;
	} else if (days === 1) {
		return '1 day ago';
	} else if (days > 1) {
		return `${days} days ago`;
	} else if (hours === 1) {
		return '1 hour ago';
	} else if (hours > 1) {
		return `${hours} hours ago`;
	} else if (minutes === 1) {
		return '1 minute ago';
	} else if (minutes > 1) {
		return `${minutes} minutes ago`;
	} else {
		return 'today';
	}
}
