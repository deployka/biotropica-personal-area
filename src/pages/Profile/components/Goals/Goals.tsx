import s from './Goals.module.scss';
interface Props {
  Goals: any;
}

export const Goals = ({ Goals }: Props) => {
  return (
    <div className={s.goals}>
      {Goals.amount} {'  '}
      активных целей
    </div>
  );
};
