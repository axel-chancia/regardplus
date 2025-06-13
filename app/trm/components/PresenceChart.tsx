"use client"
import { useEffect } from "react";
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface ChartDataItem {
  day: string;
  absences: number;
  presences: number;
}

interface PresenceChartProps {
  chartData: ChartDataItem[];
}

const PresenceChart: React.FC<PresenceChartProps> = ({ chartData }) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    if (!chartDom) {
      console.error("L'élément DOM avec l'ID 'main' n'a pas été trouvé.");
      return;
    }

    const myChart = echarts.init(chartDom as HTMLElement);
    myChart.showLoading();

    const days = chartData.map(item => item.day);
    const absences = chartData.map(item => item.absences);
    const presences = chartData.map(item => item.presences);

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      legend: {
        data: ['Absences', 'Présences'],
        itemGap: 5
      },
      grid: {
        top: '12%',
        left: '1%',
        right: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: days
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Nombre',
          axisLabel: {
            formatter: function (a: number) {
              a = +a;
              return isFinite(a) ? echarts.format.addCommas(a) : '';
            }
          }
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: 'Absences',
          type: 'bar',
          data: absences
        },
        {
          name: 'Présences',
          type: 'bar',
          data: presences
        }
      ],
      // ✅ Titre conforme aux types ECharts
      title: {
        text: '',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 14,
          fontWeight: 'normal'
        }
      }
    };

    myChart.setOption(option as any);
    myChart.hideLoading();

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [chartData]);

  return (
    <div id="main" style={{
      width: '100%',
      height: '350px',
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.19)',
      borderRadius: '15px'
    }}></div>
  );
};

export default PresenceChart;
