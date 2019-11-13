import { Effect } from 'dva';
import { Reducer } from 'redux';

import { SystemInfoData, ServiceInfoData } from './data';
import { querySystemInfo, queryServiceInfo } from '../services/index';

export interface DashboardState {
  systemInfoData: SystemInfoData;
  serviceInfoDatas: ServiceInfoData[];
}

export interface DashboardType {
  namespace: string;
  state: DashboardState;
  effects: {
    fetchSystemInfo: Effect;
    fetchServiceInfo: Effect;
  };
  reducers: {
    getSystemInfo: Reducer<SystemInfoData>;
    getServiceInfo: Reducer<ServiceInfoData>;
  };
}

const DashboardModel: DashboardType = {
  namespace: 'dashboardModel',
  state: {
    systemInfoData: {
      CPUInfo: {
        used: 0.0,
      },
      MemoryInfo: {
        used: 0.0,
        available: 0.0,
        total: 0.0,
      },
      DiskInfo: {
        used: new Map<string, number>(),
        total: new Map<string, number>(),
      },
    },
    serviceInfoDatas: [],
  },
  effects: {
    *fetchSystemInfo({ payload }, { call, put }) {
      const systemInfoData: SystemInfoData = yield call(querySystemInfo, payload);
      yield put({
        type: 'getSystemInfo',
        payload: { systemInfoData },
      });
    },
    *fetchServiceInfo({ payload }, { call, put }) {
      const serviceInfoDatas: ServiceInfoData[] = yield call(queryServiceInfo, payload);
      yield put({
        type: 'getServiceInfo',
        payload: { serviceInfoDatas },
      });
    },
  },
  reducers: {
    getSystemInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    getServiceInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default DashboardModel;
