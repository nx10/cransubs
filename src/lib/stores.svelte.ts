import { parseISO, compareAsc } from 'date-fns';
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

export interface SummaryStats {
	totalPackages: number;
	newestTime: string;
	oldestTime: string;
}

export function getSummaryStats(): Promise<SummaryStats | null> {
	return subrepoPromise.then((subrepo) => {
		const allSubs = subrepo.queues.flatMap((q) => q.queue);
		if (allSubs.length === 0) return null;
		const activeSubs = subrepo.queues
			.filter((q) => q.info.name !== 'Archive' && q.info.name !== 'Other')
			.flatMap((q) => q.queue);
		const allTimes = allSubs
			.map((s) => s.file_time)
			.sort((a, b) => compareAsc(parseISO(a), parseISO(b)));
		const activeTimes = activeSubs
			.map((s) => s.file_time)
			.sort((a, b) => compareAsc(parseISO(a), parseISO(b)));
		return {
			totalPackages: allSubs.length,
			newestTime: allTimes[allTimes.length - 1],
			oldestTime: activeTimes.length > 0 ? activeTimes[0] : allTimes[0]
		};
	});
}
