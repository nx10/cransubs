import { DateTime } from "luxon";

export function humanRedableMemoryUnits(bytes: number) {
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
    return DateTime.fromISO(iso).toLocaleString(DateTime.DATETIME_FULL);
}

export function iso2ago(iso: string) {
    return DateTime.fromISO(iso).toRelative();
}
