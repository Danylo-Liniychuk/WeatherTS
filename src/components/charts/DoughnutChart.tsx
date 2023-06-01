import { Chart as ChartJS, ArcElement, CoreChartOptions} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { selectImageByCode } from '../../service/helpers';

ChartJS.register(ArcElement);


interface DoughnutProps {
  data: number[];
}

interface ObjData {
  [key: number | string]: number;
}

const DoughnutChart: React.FC<DoughnutProps> = (props) => {
  let obj: ObjData = {};
  const dataSort = (data: Array<string | number>) => {
    data.forEach((el) => {
      obj.hasOwnProperty(el) ? obj[el]++ : obj[el] = 1; 
    })
  }
  const secondDataSort = () => {
    const final:ObjData = {};
    for(let key in obj) {
      const alias = selectImageByCode(+key)[1];
      final?.[alias] ? final[alias] += +obj[key] : final[alias] = +obj[key]
    }
    obj = final
  }
  dataSort(props.data);
  secondDataSort();
  const data = {
      labels: Object.keys(obj),
      datasets: [
        {
          label: 'Days',
          data: Object.values(obj),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    const position: 'chartArea' = 'chartArea' 
    const align: 'center' = 'center'
    const options = {
      maintainAspectRatio:false,
      plugins: {
        legend: {
          display: true,
          position: position,
          align: align,
          labels: {
            usePointStyle: true,
            color: 'rgba(221, 224, 228, .5)',
          }
        },
        title: {
          display: false
          }
       }
    }
    return(
        <>
          <Doughnut data={data} options={options}/>
          <div className='chart_title'>Weather<br/>conditions</div>
        </>
    )
}

export default DoughnutChart
