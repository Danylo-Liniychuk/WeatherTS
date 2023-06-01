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
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Мінімальна температура',
        data: props.valueMin,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Настройки графика
  const options= {
    maintainAspectRatio:false,
    scales: {
      x: {
        ticks:{
          maxTicksLimit: 10,
          color: '#fff'
        },
        grid: {
          color: 'rgba(255, 255, 255, .1)'
        },
        border: {
          offset: true,
          dash: [5,5]
        }

      },
      y: {
        grid: {
          borderDash: [5, 5],
          color: 'rgba(255, 255, 255, .1)' 
        },
        border: {
          offset: true,
          dash: [5,5]
        },
        ticks:{
          color: '#fff'
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
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      }
    },
  };
    return (
        <Line data={data} options={options}/>
    )
}   

export default LineChart