import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

import s from './Graph.module.scss';
import { useSelector } from 'react-redux';
import { selectGoalData } from '../../../../store/ducks/goal/selectors';
import { Dates } from '../../../../shared/Global/Calendar/Calendar';
import moment, { Moment } from 'moment';

Chart.register(...registerables);

interface Props {
  dates: Dates;
}

export const Graph = ({ dates }: Props) => {
  const goal = useSelector(selectGoalData);
  const ctx = useRef<any>(null);
  const myChart = useRef<any>(null);

  const values: Array<string> = [];

  useEffect(() => {
    myChart.current = new Chart(ctx.current, {
      type: 'line',
      data: {
        labels: values,
        datasets: [
          {
            borderColor: '#6f61d0',
            label: 'Вес',
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
        },
      },
    });
  }, []);

  useEffect(() => {
    const datesTemp: Moment[] = [];

    if (dates.endDate && dates.startDate) {
      const startDate = moment(dates?.startDate);
      const endDate = moment(dates?.endDate);
      let currentDate = startDate;
      while (currentDate.add(1, 'days').diff(endDate) <= 0) {
        datesTemp.push(currentDate);
      }

      switch (datesTemp.length) {
        case 7:
          values.push(...formatArrayDates(datesTemp, 'dddd'));
          break;
        case 30:
          values.push(...formatArrayDates(datesTemp, 'DD'));
          break;
        case 360:
          values.push(...formatArrayDates(datesTemp, 'MMMM'));
          break;
        default:
          break;
      }
      myChart.current.data.labels = values;
      myChart.current.update();
    }
  }, [dates, myChart, values, goal]);

  useEffect(() => {
    if (goal?.values?.length || goal?.start_result) {
      myChart.current.data.datasets[0]['data'] = [
        goal.start_result,
        ...(goal?.values?.map(el => el?.value) || []),
      ];
      myChart.current.update();
    }
  }, [goal]);

  function formatArrayDates(array: Array<Moment>, format: string) {
    return array.map((date: Moment) => date.format(format));
  }

  return (
    <div className={s.container}>
      <div className={s.graph}>
        <canvas id={'myChart'} ref={ctx} width="840" height="420"></canvas>
      </div>
    </div>
  );
};
