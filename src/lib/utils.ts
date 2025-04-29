import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseDurationString(str: string) {
	if (!str || str.length < 2) {
		return null;
	}

	const unit = str.slice(-1);
	const numberString = str.slice(0, -1);
	const value = parseInt(numberString, 10);

	if (isNaN(value) || !['d', 'h', 'm', 's'].includes(unit)) {
		return null;
	}

	return { value, unit };
}
