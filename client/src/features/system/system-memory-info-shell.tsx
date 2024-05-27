import { useState } from 'react';
import { useLuna, lunaRequest } from '../@luna';
import { SystemMemoryInfoContent } from './system-memory-info-content';

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

export function SystemMemoryInfoShell() {
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

  return unitList ? <SystemMemoryInfoContent unitList={unitList} /> : <div>loading...</div>;
}
