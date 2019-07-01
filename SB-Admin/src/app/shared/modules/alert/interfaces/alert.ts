export interface Alert {
    title: string; // title in our alert window.
    type: string;  // type if our alert. It may be 'success, danger, infor'
    time: number;  // life time of alert
    body: string;  // Message that we want to show in alert
}
