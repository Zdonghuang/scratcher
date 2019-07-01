export enum WorkflowStatus {
    On = 'on',
    Off = 'off'
}

export class Workflow {
    id: number;
    payloadId: string;
    content: string;
    up: WorkflowStatus;
    type: string;
    createTime: Date;
    updateTime: Date;
    name: string;
}

export class PagedResponse {
    count: number;
    data: Workflow[];
}

export class DeviceInfo {
    deviceId: string;
    deviceName: string;
    deviceModel: string;
}

export class AWD {
    appId: string;
    devices: DeviceInfo[];
}
