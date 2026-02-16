import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function humanReadableMemoryUnits(bytes: number) {
	const units = ['kB', 'MB', 'GB', 'TB'];
	let size = bytes;
	let i = 0;
	for (; i < units.length - 1; i++) {
		size /= 1024;
		if (size <= 1024) {
			break;
		}
	}
	return Math.max(size, 0.1).toFixed(1) + ' ' + units[i];
}

export function iso2locale(iso: string) {
	return format(parseISO(iso), 'PPPPp');
}

export function iso2ago(iso: string) {
	return formatDistanceToNow(parseISO(iso), { addSuffix: true });
}

export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
