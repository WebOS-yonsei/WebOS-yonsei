import { useState } from 'react';
import { lunaRequest, useLuna } from '../@luna';
import { SystemRunningApplicationContent } from './system-running-application-content';

type WindowType = 'card' | 'minimal' | 'overlay' | 'popup';

export type Application = {
  id: string; // The application ID (required)
  launchPointId?: string; // The launch point ID of the app (optional)
  instanceId?: string; // The instance ID of the app (optional)
  displayId?: number; // The display ID of the app (optional)
  processId: string; // The process ID of the application (required)
  webprocessid: string; // The webprocess ID of the application (required)
  defaultWindowType: WindowType; // The default window type of the application (required)
  appType: string; // The application type (required)
};

export function SystemRunningApplicationShell() {
  const [appList, setAppList] = useState<Application[]>();

  useLuna(() =>
    lunaRequest<{
      subscribed: boolean;
      returnValue: boolean;
      running: Application[];
    }>('luna://com.webos.applicationmanager')({
      method: 'running',
      onSuccess: ({ running }) => {
        setAppList(running);
      },
      parameters: {
        subscribe: true,
      },
    }),
  );

  return appList ? <SystemRunningApplicationContent appList={appList} /> : <div>Loading...</div>;
}
