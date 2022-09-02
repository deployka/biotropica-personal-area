import React from 'react';
import { Button } from '../../../shared/Form/Button/Button';

type Props = {
  onDiscard: () => void;
  onChange: () => void;
};

export const ProgressTabNotificationButtons = ({
  onDiscard,
  onChange,
}: Props) => {
  return (
    <>
      <Button
        style={{
          marginBottom: '5px',
          marginTop: '5px',
          background: '#fff',
          color: '#D06361',
        }}
        name="discard"
        onClick={onChange}
        options={{
          content: 'Удалить',
          width: '100px',
          height: '30px',
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
