interface CranQueueInfo {
    order: number;
    name: string;
    description: string;
    longdescription: string;
    reference: string;
    reference_label: string;
}
interface Submission {
    file_bytes: number;
    //file_name: string;
    file_time: string;
    folder: string;
    pkg_name: string;
    pkg_version: string;
    request_time: string;
}
interface Snapshot {
    capture_duration: number;
    capture_time: string;
    submissions: Submission[];
}
interface SnapshotContainer {
    update_interval: number;
    snapshot: Snapshot;
}
interface CranQueue {
    info: CranQueueInfo;
    queue: Submission[];
}