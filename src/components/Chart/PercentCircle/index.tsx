import React, { FC, useRef, useEffect } from 'react';
const echarts = require('echarts');

interface PercentCircleProps {
  percent: number;
  label: string;
}

const PercentCircle: FC<PercentCircleProps> = props => {
  const { percent, label } = props;
  const percentCircle = useRef(null);

  useEffect(() => {
    const total = 100;
    const option = {
      series: [
        {
          type: 'pie',
          radius: ['70%', '100%'],
          startAngle: 180,
          hoverAnimation: false, // 鼠标滑过时不放大
          label: { show: false }, // 不显示Label
          silent: true, // 不响应鼠标,
          animation: false, // 不使用动画效果
          data: [
            {
              value: percent,
              name: label,
              itemStyle: {
                color: 'red',
              },
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  color: 'black',
                },
              },
            },
            {
              value: total - percent,
              name: 'rest',
              itemStyle: {
                color: 'lightgrey',
              },
            },
            {
              value: total,
              name: 'bottom',
              itemStyle: {
                color: 'transparent',
              },
            },
          ],
        },
      ],
    };

    const chart = echarts.init(percentCircle.current);
    chart.setOption(option);
  }, [percent]);

  return <div ref={percentCircle} style={{ width: '100%', height: '100%' }} />;
};

export default PercentCircle;
