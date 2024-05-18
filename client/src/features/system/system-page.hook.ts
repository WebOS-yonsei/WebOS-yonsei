import { useState } from 'react';
import { lunaRequest, useLuna } from '../@luna';

type GetProcStat = {
  stat: string;
  returnValue: boolean;
};

interface GetUnitList {
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
}

export function useSystemPage() {
  const [procStat, setProcStat] = useState<GetProcStat>();

  useLuna(() =>
    lunaRequest<GetProcStat>('luna://com.webos.memorymanager')({
      method: 'getProcStat',
      onSuccess: setProcStat,
      parameters: {
        subscribe: true,
        // format: 'json',
      },
    }),
  );

  const [unitList, setUnitList] = useState<GetUnitList>();

  useLuna(() =>
    lunaRequest<GetUnitList>('luna://com.webos.memorymanager')({
      method: 'getUnitList',
      onSuccess: setUnitList,
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
