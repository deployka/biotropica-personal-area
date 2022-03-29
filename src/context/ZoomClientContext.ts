import React, { createContext } from 'react';
import { EmbeddedClient } from '@zoomus/websdk/embedded';

export const ZoomClientContext =
  createContext<typeof EmbeddedClient>(EmbeddedClient);
