import React, { useEffect, useState } from 'react';
import { AppModule } from './AppModule';

export type ZoomProps = {
  meetingNumber: string;
  password: string;
  username: string;
  role: number;
  onClose(): void;
  className?: string;
};

export function Zoom(props: ZoomProps) {
  const [mediaAccess, setMediaAccess] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => setMediaAccess(true))
      .catch(() => setMediaAccess(true));
  }, []);

  if (!mediaAccess) {
    return (
      <div>
        Для проведения видеоконсультации необходимо разрешить браузеру
        использовать данные камеры и микрофона
      </div>
    );
  }

  return (
    <AppModule
      allow="camera;microphone"
      className={props.className}
      url={process.env.REACT_APP_ZOOM_FRONT_URL as string}
      params={{
        meetingNumber: props.meetingNumber,
        password: props.password,
        username: props.username,
        role: props.role.toString(),
      }}
      events={{
        onClose: props.onClose,
      }}
    />
  );
}
