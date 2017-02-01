export enum HostieStatus {
  OFFLINE = 0,
  ONLINE  = 1,
}

export type Hostie = {
  id:         number,
  token:      string,
  nick:       string,
  createTime: number,
  note:       string,
  status:     HostieStatus,
  version:    string,
  runtime:    string,
}
