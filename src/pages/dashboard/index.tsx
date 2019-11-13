import React, { FC, useEffect } from 'react';
import { Card, Empty } from 'antd';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

import { SystemInfoData, ServiceInfoData } from './models/data';

import PercentCircle from '@/components/Chart/PercentCircle';

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
      <Card title="系统信息">
        {systemInfoData.CPUInfo.used > 0 ? (
          <PercentCircle percent={systemInfoData.CPUInfo.used} label="CPU占用" />
        ) : (
          <Empty />
        )}
      </Card>
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
