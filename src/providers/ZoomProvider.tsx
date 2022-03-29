import React, { ReactNode } from 'react';
import { ZoomClientContext } from '../context/ZoomClientContext';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

type Props = {
  children: ReactNode;
};

export const ZoomProvider = ({ children }: Props) => {
  const client = ZoomMtgEmbedded.createClient();
  return (
    <ZoomClientContext.Provider value={client}>
      {children}
    </ZoomClientContext.Provider>
  );
};
