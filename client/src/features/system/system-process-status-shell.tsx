import { useState } from 'react';
import { lunaRequest, useLuna } from '../@luna';
import { SystemProcessStatusContent } from './system-process-status-content';

export type ProcessStat = {
  cpu: number[];
  cpu0: number[];
  cpu1: number[];
  cpu2: number[];
  cpu3: number[];
  interrupts: number[];
  totalProcesses: number;
  runningProcesses: number;
  blockedProcesses: number;
  softIRQs: number[];
};

export function SystemProcessStatusShell() {
  const [procStat, setProcStat] = useState<ProcessStat>();

  useLuna(() =>
    lunaRequest<{
      stat: string[];
      returnValue: boolean;
    }>('luna://com.webos.memorymanager')({
      method: 'getProcStat',
      onSuccess: ({ stat }) => {
        const tmp = stat.reduce((acc, el) => {
          const [key, ...rest] = el.split(/\s+/);
          switch (key) {
            case 'cpu':
              acc.cpu = rest.map(Number);
              break;
            case 'cpu0':
              acc.cpu0 = rest.map(Number);
              break;
            case 'cpu1':
              acc.cpu1 = rest.map(Number);
              break;
            case 'cpu2':
              acc.cpu2 = rest.map(Number);
              break;
            case 'cpu3':
              acc.cpu3 = rest.map(Number);
              break;
            case 'intr':
              acc.interrupts = rest.map(Number);
              break;
            case 'processes':
              acc.totalProcesses = Number(rest[0]);
              break;
            case 'runngingProcesses':
              acc.totalProcesses = Number(rest[0]);
              break;
            case 'blockedProcesses':
              acc.blockedProcesses = Number(rest[0]);
              break;
            case 'softirq':
              acc.softIRQs = rest.map(Number);
              break;
            default:
              break;
          }

          return acc;
        }, {} as ProcessStat);

        setProcStat(tmp);
      },
      parameters: {
        subscribe: true,
      },
    }),
  );

  return procStat ? <SystemProcessStatusContent procStat={procStat} /> : <div>Loading...</div>;
}
