import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Box, Center, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, ChartData } from 'chart.js';
import { UnitList } from './system-memory-info-shell';

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const unitListColumnHelper = createColumnHelper<UnitList['unitList'][number]>();

const unitListColumns = [
  unitListColumnHelper.accessor('TP', {
    header: 'TP',
    cell: (val) => val.getValue(),
  }),
  unitListColumnHelper.accessor('ID', {
    header: 'ID',
    cell: (val) => val.getValue(),
  }),
  unitListColumnHelper.accessor('IN', {
    header: 'IN',
    cell: (val) => val.getValue(),
  }),
  unitListColumnHelper.accessor('PL', {
    header: 'PL',
    cell: (val) => val.getValue(),
  }),
  unitListColumnHelper.accessor('FG', {
    header: 'FG',
    cell: (val) => val.getValue(),
  }),
  unitListColumnHelper.accessor('RC', {
    header: 'RC',
    cell: (val) => val.getValue(),
  }),
  unitListColumnHelper.accessor('SZ', {
    header: 'SZ',
    cell: (val) => val.getValue(),
  }),
  unitListColumnHelper.accessor('PD', {
    header: 'PD',
    cell: (val) => val.getValue() || '-',
  }),
];

export function SystemMemoryInfoContent({ unitList }: { unitList: UnitList }) {
  const unitListTable = useReactTable({
    data: unitList.unitList,
    columns: unitListColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const memoryData: ChartData<'doughnut'> = {
    labels: ['Usable Memory', 'Swap Used', 'Vmalloc Size'],
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: [unitList.usableMemory, unitList.usedSwap, unitList.vmallocSize],
        backgroundColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
      },
    ],
  };

  return (
    <VStack align="stretch" spacing="32px">
      <VStack align="stretch">
        <Heading as="h4" fontSize="24px">
          Unit List
        </Heading>
        <TableContainer>
          <Table size="sm">
            <Thead>
              {unitListTable.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      <Box onClick={header.column.getToggleSortingHandler()} cursor={header.column.getCanSort() ? 'pointer' : 'default'}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Box>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {unitListTable.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
      <VStack align="stretch">
        <Heading as="h4" fontSize="24px">
          Usable Memory
        </Heading>
        <Center>
          <Doughnut data={memoryData} width={600} height={600} options={{ responsive: false }} />
        </Center>
      </VStack>
    </VStack>
  );
}
