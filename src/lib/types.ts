export interface CranQueueInfo {
	order: number;
	name: string;
	description: string;
	longdescription: string;
	reference: string;
	reference_label: string;
}

export interface Submission {
	file_bytes: number;
	file_time: string;
	folder: string;
	pkg_name: string;
	pkg_version: string;
	request_time: string;
	original_position?: number;
}

export interface Snapshot {
	capture_duration: number;
	capture_time: string;
	submissions: Submission[];
}

export interface SnapshotContainer {
	update_interval: number;
	snapshot: Snapshot;
}

export interface CranQueue {
	info: CranQueueInfo;
	queue: Submission[];
}
