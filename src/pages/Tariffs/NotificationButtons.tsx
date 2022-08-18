import React from 'react';
import { Button } from '../../shared/Form/Button/Button';

type Props = {
  type: 'extend' | 'replace';
  onDiscard: () => void;
  onChange: () => void;
};

export const NotificationButtons = ({ type, onDiscard, onChange }: Props) => {
  return (
    <>
      <Button
        style={{
          marginRight: '20px',
          marginBottom: '5px',
          marginTop: '5px',
        }}
        name="discard"
        onClick={onChange}
        options={{
          content: type === 'extend' ? 'Продлить' : 'Заменить',
          width: '100px',
          height: '30px',
        }}
      />
      <Button
        style={{
          marginBottom: '5px',
          marginTop: '5px',
        }}
        onClick={onDiscard}
        options={{
          content: 'Отмена',
          width: '100px',
          height: '30px',
          classes: { discard: true },
        }}
      />
    </>
  );
};
