import React, { FC, useEffect } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

import { SystemInfoData, ServiceInfoData } from './models/data';

interface DashboardPageType {
  systemInfoData: SystemInfoData;
  serviceInfoDatas: Array<ServiceInfoData>;
  fetchSystemInfo: () => void;
  fetchServiceInfo: () => void;
}

const DashboardPage: FC<DashboardPageType> = props => {
  const { fetchSystemInfo, fetchServiceInfo, systemInfoData } = props;

  useEffect(() => {
    fetchSystemInfo();
    fetchServiceInfo();
  }, [fetchSystemInfo, fetchServiceInfo]);

  return (
    <div>
      <div>CPU:{systemInfoData.CPUInfo.used}</div>
      <div>内存:{systemInfoData.MemoryInfo.used}</div>
    </div>
  );
};

function mapState2Props({ dashboardModel }: ConnectState) {
  return {
    systemInfoData: dashboardModel.systemInfoData,
    serviceInfoDatas: dashboardModel.serviceInfoDatas,
  };
}

function mapDispatch2Props(dispatch: any) {
  return {
    fetchSystemInfo() {
      dispatch({
        type: 'dashboardModel/fetchSystemInfo',
      });
    },
    fetchServiceInfo() {
      dispatch({
        type: 'dashboardModel/fetchServiceInfo',
      });
    },
  };
}

export default connect(
  mapState2Props,
  mapDispatch2Props,
)(DashboardPage);
