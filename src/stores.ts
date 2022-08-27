import { derived, writable } from 'svelte/store';
import {getSnap, SubmissionRepo} from './server_data';

const UPDATE_INTERVAL = 1000 * (60 * 5 + 1);

export const snapshot = writable(getSnap(), function start(set) {
	const interval = setInterval(() => {
		set(getSnap());
	}, UPDATE_INTERVAL);

	return function stop() {
		clearInterval(interval);
	};
});

export const subrepo = derived(
	snapshot,
	$snapshot => $snapshot.then((snap) => new SubmissionRepo(snap))
);