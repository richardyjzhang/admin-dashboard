import api from '@/utils/getBaseURL';
import request from '@/utils/request';

export async function querySystemInfo(): Promise<any> {
  return request(`${api}system-info`);
}

export async function queryServiceInfo(): Promise<any> {
  return request(`${api}service-info`);
}
