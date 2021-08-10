import { User } from '../../../../store/ducks/user/contracts/state';
import { TestsCard } from './TestsCard/TestsCard';
import s from './TestsAndAnalyze.module.scss';
import { AnalyzesCard } from './AnalyzesCard/AnalyzesCard';

interface Props {
  user: User;
}

export interface Analyze {
  info: string;
  fileName: string;
  link: string;
  createdAt: string;
}

export interface Tests {
  info: string;
  fileName: string;
  link: string;
  createdAt: string;
}

export const TestsAndAnalyze = ({ user }: Props) => {
  const tests = {
    age: '20',
    plans: 'бегу, плаванию',
    asthma: 'нет',
    diabetes: 'нет',
    updateUrl: 'upd8271389',
  };
  const analyzes: Analyze[] = [
    {
      link: 'upd8271389',
      info: 'Общеклинический анализ крови с лейкоцитами;',
      fileName: 'анализ крови с лейкоцитами',
      createdAt: '15 июня',
    },
    {
      createdAt: '15 марта',
      link: 'doc21243123',
      info: 'Биохимический анализ крови(включает параметры функции печени: АЛТ, ФСЕ,ГГТ, щелочная фосфатаза',
      fileName: 'Биохимический анализ крови',
    },
  ];
  return (
    <div className={s.tests__and__analyze}>
      <TestsCard tests={tests} />
      <AnalyzesCard analyzes={analyzes} />
    </div>
  );
};
