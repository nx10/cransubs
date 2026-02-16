import { getSnap, SubmissionRepo } from './server-data.js';

const UPDATE_INTERVAL = 1000 * (60 * 5 + 1);

let snapshotPromise = $state(getSnap());

let subrepoPromise = $derived(snapshotPromise.then((snap) => new SubmissionRepo(snap)));

$effect.root(() => {
	const interval = setInterval(() => {
		snapshotPromise = getSnap();
	}, UPDATE_INTERVAL);

	return () => {
		clearInterval(interval);
	};
});

export function getSubrepo() {
	return subrepoPromise;
}
