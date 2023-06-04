import { Chart, ArcElement} from 'chart.js';
import { Doughnut} from 'react-chartjs-2';
import { useEffect } from 'react';

interface DoughnutProps {
  dataset: number[];
  title: string;
  labels: string[];
  label: string;
  position: 'bottom' | 'top' | 'right' | 'left';
  legend: boolean;
}


Chart.register(ArcElement)
const DoughnutChart: React.FC<DoughnutProps> = (props) => {
  const {dataset, label, labels, title, legend} = props
  useEffect(() => {
    // Кастомный плагин для вывода текста в центре графика
    const centerTextPlugin = {
      id: 'centerTextPlugin',
      afterDraw: (chart: any) => {
          if (chart.config.type === 'doughnut') { // Проверка типа графика
            const {width, height, ctx } = chart;
            const { text, fontSize, fontColor, lineHeight, position} = chart.options.centerText; // Получаем настройки текста из опций графика// Получаем первый элемент легенды
            const textWidth = chart.legend.width; // Ширина легенды с дополнительным отступом
  
            ctx.restore();
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = fontColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
  
            // Разбиваем текст на две строки по первому пробелу
            const words = text.split(' ');
            const line1 = words[0];
            const line2 = words.slice(1).join(' ');

            // Позиционируем текст с учетом ширины легенды
            let textX
            if(position === 'left') {
              textX = width / 2 + textWidth / 2;
            } else if (position === "bottom"){
              textX = width / 2;
            } else {
              textX = width / 2 - textWidth / 2;
            }
            const textY1 = position === 'bottom' ? height / 2 - 25 : height / 2 - lineHeight;
            const textY2 = position === 'bottom' ? height / 2 - 5 : height / 2 + 10;
            // Выводим текст на две строки с учетом переноса
            ctx.fillText(line1, textX, textY1);
            ctx.fillText(line2, textX, textY2);
            ctx.save();
          }
      },
    }
    // Регистрация плагина
    Chart.register(centerTextPlugin);

    return () => {
      // Удаление плагина при размонтировании компонента
      Chart.unregister(centerTextPlugin);
    };
  }, []);

  const data = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: dataset,
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
    const align: 'center' = 'center'
    const options = {
      maintainAspectRatio:false,
      centerText: {
        text: title, 
        fontSize: 14,
        fontColor: 'rgba(221, 224, 228, 0.8)',
        lineHeight: 10,
        position: props.position
      },
      plugins: {
        legend: {
          maxWidth: 70,
          maxHeight: props.position === 'bottom' ? 25 : undefined,
          fullSize: false,
          display: legend,
          position: props.position,
          align: align,
          labels: {
            usePointStyle: true,
            color: 'rgba(221, 224, 228, .5)',
          },
        },
        title: {
          display: false
        }
       }
    }
    return(
        <>
          <Doughnut data={data} options={options} />
        </>
    )
}

export default DoughnutChart
