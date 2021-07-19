import classNames from 'classnames';
import s from './Loader.module.scss';

interface Props {}
export const Loader = ({}: Props) => {
  return (
    <>
      <div className={classNames(s.loader, s.loader__quart)}></div>
    </>
  );
};
