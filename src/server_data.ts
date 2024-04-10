
// https://journal.r-project.org/archive/2018-1/cran.pdf

import { DateTime } from "luxon";

// https://stat.ethz.ch/pipermail/r-package-devel/2019q1/003631.html
export const CRAN_QUEUES: { [qid: string]: CranQueueInfo } = {
    newbies: {
        order: 0,
        name: 'Newbies',
        description: 'First-time and unarchival submissions.',
        longdescription: 'This is either a new package or a package to be unarchived. ' +
            'Such packages are queued for manual inspection.',
        reference: 'https://journal.r-project.org/archive/2018-1/cran.pdf',
        reference_label: 'Learn more: Hornik, K., Ligges, U., & Zeileis, A. (2018). Changes on CRAN. 2018-07-01 to 2018-12-31. The R Journal, 10(2), 1-3.',
    },
    inspect: {
        order: 1,
        name: 'Inspect',
        description: 'Manual inspection.',
        longdescription:
            '"Manual inspection of the package, this always happens for first time ' +
            'submissions and also for packages that show possible problems that are likely to be ' +
            'false positives. In both cases some human action is required."',
            reference: 'https://journal.r-project.org/archive/2018-1/cran.pdf',
            reference_label: 'Hornik, K., Ligges, U., & Zeileis, A. (2018). Changes on CRAN. 2018-07-01 to 2018-12-31. The R Journal, 10(2), 1-3.',
    },
    pretest: {
        order: 2,
        name: 'Pretest',
        description: 'Automated checking.',
        longdescription: '"During a manual inspection, a human may trigger a new auto-check of ' +
            'the package for various reasons, e.g., after problems in the initial check or after updates of ' +
            'dependencies."',
        reference: 'https://journal.r-project.org/archive/2018-1/cran.pdf',
        reference_label: 'Hornik, K., Ligges, U., & Zeileis, A. (2018). Changes on CRAN. 2018-07-01 to 2018-12-31. The R Journal, 10(2), 1-3.',
    },
    recheck: {
        order: 3,
        name: 'Recheck',
        description: 'Reverse dependency checking.',
        longdescription: '"If the package cleanly passes the checks and has at least one reverse dependency, ' +
            'this action moves the package into a queue for auto-checking the package\'s reverse ' +
            'dependencies. If the check status of at least one of the package\'s reverse dependencies ' +
            'changes to a worse state, the maintainer is asked whether this is expected and the ' +
            'other maintainers of affected packages have been informed and hence action pending ' +
            'is triggered. If no change to a worse state is discovered, the next action is publish."',
        reference: 'https://journal.r-project.org/archive/2018-1/cran.pdf',
        reference_label: 'Hornik, K., Ligges, U., & Zeileis, A. (2018). Changes on CRAN. 2018-07-01 to 2018-12-31. The R Journal, 10(2), 1-3.',
    },
    pending: {
        order: 4,
        name: 'Pending',
        description: 'Closer manual inspection.',
        longdescription: '"A CRAN team member has to do a closer inspection and needs more time."',
        reference: 'https://stat.ethz.ch/pipermail/r-package-devel/2019q1/003631.html',
        reference_label: '[R-pkg-devel] Meaning and consequences of action pending in the submission pipeline',
    },
    waiting: {
        order: 5,
        name: 'Waiting',
        description: 'Waiting for maintainer response.',
        longdescription:
            '"CRAN\'s decision is waiting for a response from the package maintainer, e.g. when issues are present that CRAN cannot check for in the incoming checks."',
        reference: 'https://journal.r-project.org/archive/2018-1/cran.pdf',
        reference_label: 'Hornik, K., Ligges, U., & Zeileis, A. (2018). Changes on CRAN. 2018-07-01 to 2018-12-31. The R Journal, 10(2), 1-3.',
    },
    publish: {
        order: 6,
        name: 'Publish',
        description: 'Awaiting publication.',
        longdescription: '"Publish the package, if the package is already well established on CRAN, passes ' +
            'the checks cleanly, and does not have any reverse dependencies."',
        reference: 'https://journal.r-project.org/archive/2018-1/cran.pdf',
        reference_label: 'Hornik, K., Ligges, U., & Zeileis, A. (2018). Changes on CRAN. 2018-07-01 to 2018-12-31. The R Journal, 10(2), 1-3.',
    },
    archive: {
        order: 7,
        name: 'Archive',
        description: 'Rejected packages.',
        longdescription:
            '"This package was rejected. The package does not ' +
            'pass the checks cleanly and the problem are not likely to be false positives."',
        reference: 'https://journal.r-project.org/archive/2018-1/cran.pdf',
        reference_label: 'Hornik, K., Ligges, U., & Zeileis, A. (2018). Changes on CRAN. 2018-07-01 to 2018-12-31. The R Journal, 10(2), 1-3.',
    },
    other: {
        order: 999,
        name: 'Other',
        description: 'Other inspection.',
        longdescription:
            'Your package has been assigned to a specific CRAN member for further inspection.',
        reference: 'https://journal.r-project.org/archive/2018-1/cran.pdf',
        reference_label: 'Learn more: Hornik, K., Ligges, U., & Zeileis, A. (2018). Changes on CRAN. 2018-07-01 to 2018-12-31. The R Journal, 10(2), 1-3.',
    }
};

export function find_key(folder: string) {
    if (CRAN_QUEUES[folder] === undefined) {
        return 'other';
    }
    return folder;
}

export function find_queue(folder: string) {
    return CRAN_QUEUES[find_key(folder)];
}

export async function getSnap() {
    let response = await fetch('https://cransubs.fly.dev/snap');
    return (await response.json()) as Promise<SnapshotContainer>;
}

export class SubmissionRepo {
    public queues: CranQueue[] = [];

    public update_interval: number = 0;
    public capture_duration: number = 0;
    public capture_time: string = '';

    constructor(snapContainer?: SnapshotContainer, subRepo?: SubmissionRepo) {
        if (snapContainer) {
            this.update_interval = snapContainer.update_interval;
            this.capture_duration = snapContainer.snapshot.capture_duration;
            this.capture_time = snapContainer.snapshot.capture_time;


            let dict: { [folder: string]: Submission[] } = {};
            snapContainer.snapshot.submissions.forEach((sub) => {
                const folder_key = find_key(sub.folder);
                if (dict[folder_key] === undefined) {
                    dict[folder_key] = [];
                }
                dict[folder_key].push(sub);
            });

            this.queues = Object.keys(dict).map((folder) => ({
                info: find_queue(folder),
                queue: dict[folder]
            }));

            this.sort_queues();
        } else if (subRepo) {
            this.update_interval = subRepo.update_interval;
            this.capture_duration = subRepo.capture_duration;
            this.capture_time = subRepo.capture_time;
        }
    }

    private sort_queues() {
        this.queues.sort((sub_a, sub_b) => {
            const a = sub_a.info.order;
            const b = sub_b.info.order;
            return a < b ? -1 : a > b ? 1 : 0;
        });

        for (const qu of this.queues) {
            qu.queue.sort((sub_a, sub_b) => {
                const a = DateTime.fromISO(sub_a.file_time);
                const b = DateTime.fromISO(sub_b.file_time);
                return a < b ? -1 : a > b ? 1 : 0;
            });
        }
    }

    public find_pkg(name: string, file_time?: string): [Submission, CranQueue] | undefined {
        if (file_time  === undefined) {
            let pot_subs: [Submission, CranQueue][]  = [];
            for (const qu of this.queues) {
                for (const sub of qu.queue) {
                    if ((sub.pkg_name === name)) {
                        pot_subs.push([sub, qu]);
                    }
                }
            }
            return pot_subs.sort((sub_a, sub_b) => {
                const a = DateTime.fromISO(sub_a[0].file_time);
                const b = DateTime.fromISO(sub_b[0].file_time);
                return a > b ? -1 : a < b ? 1 : 0;
            }).at(0);
        } else {
            for (const qu of this.queues) {
                for (const sub of qu.queue) {
                    if ((sub.pkg_name === name) && (sub.file_time === file_time)) {
                        return [sub, qu];
                    }
                }
            }
        }
        return undefined;
    }

    public filter(str: string): SubmissionRepo {

        const re = new SubmissionRepo(undefined, this);

        const str_lower = str.toLowerCase();
        re.queues = this.queues.map((qu) => ({
            info: qu.info,
            queue: qu.queue.filter((sub) => sub.pkg_name.toLowerCase().search(str_lower) > -1)
        })).filter((qu) => qu.queue.length > 0);
        return re;
    }
}

export function pkg_url_full(sub: Submission) {
    return '/pkg#' + encodeURIComponent(sub.pkg_name + '_' + sub.file_time);
}

export function pkg_url_name(sub: Submission) {
    return '/pkg#' + encodeURIComponent(sub.pkg_name);
}
