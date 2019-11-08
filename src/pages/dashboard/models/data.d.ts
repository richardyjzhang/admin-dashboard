export interface CPUInfoData {
  used: number;
}

export interface MemoryInfoData {
  used: number;
  available: number;
  total: number;
}

export interface DiskInfoData {
  total: Map<string, number>;
  used: Map<string, number>;
}

export interface SystemInfoData {
  CPUInfo: CPUInfoData;
  MemoryInfo: MemoryInfoData;
  DiskInfo: DiskInfoData;
}

export interface ServiceInfoData {
  name: string;
  containerName: string;
  containerStatus: boolean;
  memory: number;
}
