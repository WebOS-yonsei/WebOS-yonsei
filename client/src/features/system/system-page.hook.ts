import { useState } from 'react';
import { lunaRequest, useLuna } from '../@luna';

type Unit = {
  TP: string;
  ID: string;
  IN: 'F' | 'T';
  PL: 'F' | 'T';
  FG: 'F' | 'T';
  RC: string;
  SZ: string;
  PD: string;
};

export type UnitList = {
  unitList: Unit[];
  usableMemory: number;
  usedSwap: number;
  vmallocSize: number;
};

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

export function useSystemPage() {
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

  const [unitList, setUnitList] = useState<UnitList>();

  useLuna(() =>
    lunaRequest<{
      ATSC3_0_NRT: number;
      unitList: string[];
      usable_memory: number;
      swapUsed: number;
      EFS_BufferCacheStat: {
        EFS_BC_CurrentSize: number;
        EFS_BC_AccuShrinkSize: number;
        EFS_BC_ZspageSize: number;
        EFS_BC_AavailSize: number;
        EFS_BC_compRate: number;
      };
      returnValue: boolean;
      vmallocInfo: {
        cur_vmallocSize: number;
        init_vmallocSize: number;
      };
    }>('luna://com.webos.memorymanager')({
      method: 'getUnitList',
      // eslint-disable-next-line camelcase
      onSuccess: ({ unitList: rawUnitList, usable_memory, swapUsed, vmallocInfo: { cur_vmallocSize } }) => {
        const header = rawUnitList[0].split(/\s+/);

        const mapped = rawUnitList.slice(1).map((row) =>
          row.split(/\s+/).reduce(
            (acc, el, index) => {
              acc[header[index]] = el;
              return acc;
            },
            {} as Record<string, string>,
          ),
        ) as Unit[];

        setUnitList({
          unitList: mapped,
          usableMemory: Number(usable_memory),
          usedSwap: Number(swapUsed),
          vmallocSize: Number(cur_vmallocSize),
        });
      },

      parameters: {
        subscribe: true,
      },
    }),
  );

  return {
    procStat,
    unitList,
  };
}
