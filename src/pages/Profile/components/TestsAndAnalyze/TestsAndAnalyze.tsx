import { User } from '../../../../store/ducks/user/contracts/state';
import { TestsCard } from './TestsCard/TestsCard';
import s from './TestsAndAnalyze.module.scss';
import { AnalyzesCard } from './AnalyzesCard/AnalyzesCard';

interface Props {
  user: User;
}

export const TestsAndAnalyze = ({ user }: Props) => {
  const testFields = {
    age: '20',
    plans: 'бегу, плаванию',
    asthma: 'нет',
    diabetes: 'нет',
    updateUrl: 'upd8271389',
  };
  const testAnalyzes = {
    updateUrl: 'upd8271389',
    analyzes: [
      'Общеклинический анализ крови с лейкоцитами;',
      'Биохимический анализ крови(включает параметры функции печени: АЛТ, ФСЕ,ГГТ, щелочная фосфатаза',
    ],
    documents: [
      {
        name: 'анализ крови с лейкоцитами',
        createdAt: '15 июня',
        link: 'doc213123',
      },
      {
        name: 'Биохимический анализ крови',
        createdAt: '15 марта',
        link: 'doc21243123',
      },
    ],
  };
  return (
    <div className={s.tests__and__analyze}>
      <TestsCard options={testFields} />
      <AnalyzesCard options={testAnalyzes} />
    </div>
  );
};
