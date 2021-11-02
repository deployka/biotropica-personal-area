import { Link } from "react-router-dom";
import s from "./Tariff.module.scss";
interface Props {
  Tariff: any; //TODO: Добавить интерфейс после добавления тарифов в редакс
}

export const Tariff = ({ Tariff }: Props) => {
  return (
    <Link style={{ textDecoration: "none" }} to="/tariffs">
      <div className={s.tariff}>
        <div className={s.title}>
          <p>
            Тариф {"  "}
            {Tariff.name}
          </p>
        </div>
        <div className={s.date}>
          <p>
            до {"  "}
            {Tariff.expires}
          </p>
        </div>
      </div>
    </Link>
  );
};
