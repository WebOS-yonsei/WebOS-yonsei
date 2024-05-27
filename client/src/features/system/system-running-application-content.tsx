import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { VStack, Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Box } from '@chakra-ui/react';
import { Application } from './system-running-application-shell';

const appListColumnHelper = createColumnHelper<Application>();

const appListColumns = [
  appListColumnHelper.accessor('id', {
    header: 'ID',
    cell: (val) => val.getValue(),
  }),
  appListColumnHelper.accessor('launchPointId', {
    header: 'Launch Point ID',
    cell: (val) => val.getValue(),
  }),
  appListColumnHelper.accessor('instanceId', {
    header: 'Instance ID',
    cell: (val) => val.getValue(),
  }),
  appListColumnHelper.accessor('displayId', {
    header: 'Display ID',
    cell: (val) => val.getValue(),
  }),
  appListColumnHelper.accessor('processId', {
    header: 'Process ID',
    cell: (val) => val.getValue(),
  }),
  appListColumnHelper.accessor('webprocessid', {
    header: 'Web Process ID',
    cell: (val) => val.getValue(),
  }),
  appListColumnHelper.accessor('defaultWindowType', {
    header: 'Default Window Type',
    cell: (val) => val.getValue(),
  }),
  appListColumnHelper.accessor('appType', {
    header: 'App Type',
    cell: (val) => val.getValue(),
  }),
];

export function SystemRunningApplicationContent({ appList }: { appList: Application[] }) {
  const appListTable = useReactTable({
    data: appList,
    columns: appListColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <VStack align="stretch" spacing="32px">
      <VStack align="stretch">
        <Heading as="h4" fontSize="24px">
          App List
        </Heading>
        <TableContainer>
          <Table size="sm">
            <Thead>
              {appListTable.getHeaderGroups().map((headerGroup) => (
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
              {appListTable.getRowModel().rows.map((row) => (
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
    </VStack>
  );
}
