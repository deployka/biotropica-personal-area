import React from 'react';
import { Button } from '../../../shared/Form/Button/Button';

type Props = {
  onDiscard: () => void;
  onDelete: () => void;
};

export const NotificationButtons = ({ onDiscard, onDelete }: Props) => {
  return (
    <>
      <Button
        style={{
          marginRight: '20px',
          color: '#fff',
          marginBottom: '5px',
          marginTop: '5px',
          border: '1px solid #fff',
          background: 'none ',
        }}
        name="discard"
        onClick={onDelete}
        options={{
          content: 'Удалить',
          width: '100px',
          height: '30px',
          classes: { discard: true },
        }}
      />
      <Button
        style={{
          marginBottom: '5px',
          marginTop: '5px',
          background: '#fff',
          color: '#000',
        }}
        onClick={onDiscard}
        options={{
          content: 'Отмена',
          width: '100px',
          height: '30px',
        }}
      />
    </>
  );
};
