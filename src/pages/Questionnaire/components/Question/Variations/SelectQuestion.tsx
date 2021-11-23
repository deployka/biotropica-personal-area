import React, { useState } from "react";

import s from "../Question.module.scss";

type Props = {
  options?: {
    value: string | number;
    label: string;
  }[];

  onAnswer(val: string | number): void;
};

export const SelectQuestion = ({ options, onAnswer }: Props) => {
  const isBig = options && options.length <= 2;
  const [selected, setSelected] = useState<string | number>("");

  return (
    <div className={isBig ? s.big__buttons__select : s.small__buttons__select}>
      {options &&
        options.map((option) => (
          <button
            className={`${isBig ? s.big__button : s.small__button} ${
              option.value === selected && s.selected
            }`}
            onClick={() => {
              const answer = selected !== option.value ? option.value : "";
              setSelected(answer);
              onAnswer(answer);
            }}
          >
            {option.label}
          </button>
        ))}
    </div>
  );
};
