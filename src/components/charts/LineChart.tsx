import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

interface LineChartProps {
  valueMax: number[];
  valueMin: number[];
  labels: string[];
}


const LineChart: React.FC<LineChartProps> = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Максимальна температура',
        data: props.valueMax,
        fill: false,
        borderColor: 'rgba(255, 206, 86, 0.8)',
        tension: 0.1,
        pointRadius: (context: any) => {
          if (context.dataIndex === 0 || context.dataIndex === context.dataset.data.length - 1 || (context.dataIndex + 1) % 3 === 0) {
            return 3; // Радиус точек для отображаемых элементов
          }
          return 0; // Радиус точек для остальных элементов
        },
      },
      {
        label: 'Мінімальна температура',
        data: props.valueMin,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointRadius: (context: any) => {
          if (context.dataIndex === 0 || context.dataIndex === context.dataset.data.length - 1 || (context.dataIndex + 1) % 3 === 0) {
            return 3; // Радиус точек для отображаемых элементов
          }
          return 0; // Радиус точек для остальных элементов
        },
      }
    ]
  };

  // Настройки графика
  const options= {
    responsive:true,
    maintainAspectRatio:false,
    scales: {
      x: {
        ticks:{
          maxTicksLimit: 4,
          color: 'rgba(221, 224, 228, .5)'
        },
        grid: {
          color: 'rgba(221, 224, 228, .1)'
        },
        border: {
          offset: true,
          dash: [5,5]
        }

      },
      y: {
        grid: {
          borderDash: [5, 5],
          color: 'rgba(221, 224, 228, .1)' 
        },
        border: {
          offset: true,
          dash: [5,5]
        },
        ticks:{
          color: 'rgba(221, 224, 228, .5)'
        },
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
    return (
        <Line data={data} options={options}/>
    )
}   

export default LineChart