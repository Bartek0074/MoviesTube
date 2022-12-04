export function calcDate(datde) {
	const actualDate = new Date();

	const diff = Math.floor(actualDate.getTime() - datde.getTime());
	const day = 1000 * 60 * 60 * 24;

	const days = Math.floor(diff / day);
	const months = Math.floor(days / 31);
	const years = Math.floor(months / 12);

	if (years === 1){
		return '1 year ago'
	}
	else if ( years > 1) {
		return `${years} years ago`
	}
	else if ( months === 1) {
		return '1 month ago'
	}
	else if ( months > 1) {
		return `${months} months ago`
	}
	else if ( days === 1) {
		return '1 day ago'
	}
	else if ( days > 1) {
		return `${days} days ago`
	}
	else {
		return 'today'
	}
}