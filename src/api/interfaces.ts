export interface Direction {
    seq: string;
    dest: string;
    plat: string;
    time: string;
    ttnt: string;
    valid: string;
    source: string;
}

export interface LineStation {
    curr_time: string;
    sys_time: string;
    UP: Direction[];
    DOWN: Direction[];
}

export interface ResponseJson {
    sys_time: string;
    curr_time: string;
    data: {
        [key: string]: LineStation;
    };
    status: number;
    message: string;
    isdelay: string;
}

export interface CreateURLOptions {
    line: string;
    station: string;
}
