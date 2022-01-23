import React, { useEffect, useRef } from 'react';
import { Chart, ChartItem, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import s from './Graph.module.scss';
import { useSelector } from 'react-redux';
import { selectGoalData } from '../../../../store/ducks/goal/selectors';
import moment from 'moment';
import { GoalValue } from '../../../../store/ducks/goal/contracts/state';

Chart.register(...registerables);

interface Props {
  startDate: Date;
  endDate: Date;
}

export const Graph = ({ startDate, endDate }: Props) => {
  const goal = useSelector(selectGoalData);
  const ctx = useRef<HTMLCanvasElement>(null);
  const myChart = useRef<any>(null);

  const values: Array<Date> = [];

  function filterValues() {
    if (!goal) {
      return;
    }
    return [
      ...(goal?.values?.filter(el =>
        moment(el?.createdAt).isBetween(startDate, endDate, 'days', '[]'),
      ) || []),
    ]
      .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
      .map((el: GoalValue) => ({ x: el.createdAt, y: +el.value }));
  }

  useEffect(() => {
    if (ctx.current) {
      myChart.current = new Chart(ctx.current, {
        type: 'line',
        data: {
          datasets: [
            {
              borderColor: '#6f61d0',
              label: 'Не определен',
              data: [],
              borderWidth: 2,
              tension: 0.5,
            },
          ],
        },

        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              ticks: {
                source: 'labels',
              },
              type: 'time',

              time: {
                unit: 'day',
                displayFormats: {
                  day: 'dddd',
                  month: 'MMMM',
                  year: 'MMM DD',
                },
              },
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (endDate && startDate) {
      const currentDate = moment(startDate);
      const dayLength = moment(endDate).diff(startDate, 'days');

      if (dayLength <= 7) {
        myChart.current.options.scales.x.time.unit = 'day';
        myChart.current.options.scales.x.time.displayFormats.day = 'dddd';
        while (currentDate.diff(endDate) <= 0) {
          values.push(currentDate.toDate());
          currentDate.add(1, 'days');
        }
      } else if (dayLength > 7 && dayLength <= currentDate.daysInMonth()) {
        myChart.current.options.scales.x.time.unit = 'day';
        myChart.current.options.scales.x.time.displayFormats.day = 'DD';
        while (currentDate.diff(endDate) <= 0) {
          values.push(currentDate.toDate());
          currentDate.add(1, 'days');
        }
      } else if (
        dayLength > currentDate.daysInMonth() &&
        dayLength <= currentDate.daysInMonth() * 12
      ) {
        myChart.current.options.scales.x.time.unit = 'month';
        while (currentDate.diff(endDate) <= 0) {
          currentDate.add(1, 'months');
          values.push(currentDate.toDate());
        }
      } else if (dayLength > currentDate.daysInMonth() * 12) {
        myChart.current.options.scales.x.time.unit = 'year';
        myChart.current.options.scales.x.time.displayFormats.year = 'YY';
        while (currentDate.diff(endDate) <= 0) {
          values.push(currentDate.toDate());
          currentDate.add(1, 'years');
        }
      }

      myChart.current.data.labels = values;
      myChart.current.data.datasets[0].label = String(goal?.units[0].label);
      myChart.current.update();
    }
  }, [startDate, endDate, myChart, values, goal]);

  useEffect(() => {
    if (goal?.values?.length || goal?.startResult) {
      myChart.current.data.datasets[0].data = filterValues();
      myChart.current.update();
    }
  }, [goal, startDate, endDate]);

  return (
    <div className={s.container}>
      <div className={s.graph}>
        <canvas id={'myChart'} ref={ctx} width="840" height="420"></canvas>
      </div>
    </div>
  );
};
