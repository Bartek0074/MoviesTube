export function numFormatter(num) {
	if (num > 999 && num <= 999999) {
		return (num / 1000).toFixed(1) + 'K';
	} else if (num > 1000000 && num <= 999999999) {
		return (num / 1000000).toFixed(2) + 'M';
	} else if (num > 1000000000) {
		return (num / 1000000000).toFixed(2) + 'B';
	} else if (num <= 999) {
		return num;
	}
}
