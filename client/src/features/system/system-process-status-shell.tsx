import { Center, Heading, VStack } from '@chakra-ui/react';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ProcessStat } from './system-page.hook';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

export function SystemProcessStatusShell({ procStat }: { procStat: ProcessStat }) {
  const cpuLabels = ['user', 'nice', 'system', 'idle', 'iowait', 'irq', 'softirq', 'steal', 'guest', 'guest_nice'];
  const cpuData = {
    labels: cpuLabels,
    datasets: [
      {
        label: 'CPU',
        data: procStat.cpu,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'CPU0',
        data: procStat.cpu0,
        backgroundColor: 'rgba(153, 102, 255, 1)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'CPU1',
        data: procStat.cpu1,
        backgroundColor: 'rgba(255, 159, 64, 1)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'CPU2',
        data: procStat.cpu2,
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'CPU3',
        data: procStat.cpu3,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const cpuOptions = {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Interrupts Data
  const intrData = {
    labels: Array.from({ length: 100 }, (_, i) => `Interrupt ${i}`), // Simplified for example
    datasets: [
      {
        label: 'Interrupts',
        data: procStat.interrupts,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const intrOptions = {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Processes Data
  const processData = {
    labels: ['Total Processes', 'Running', 'Blocked'],
    datasets: [
      {
        label: 'Processes',
        data: [procStat.totalProcesses, procStat.runningProcesses, procStat.blockedProcesses],
        backgroundColor: 'rgba(153, 102, 255, 1)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const processOptions = {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // SoftIRQs Data
  const softirqData = {
    labels: ['Total', 'HI', 'Timer', 'NetTx', 'NetRx', 'Block', 'IRQ_POLL', 'Tasklet', 'Sched', 'HRTimer', 'RCU'],
    datasets: [
      {
        label: 'SoftIRQs',
        data: procStat.softIRQs,
        backgroundColor: 'rgba(255, 159, 64, 1)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const softirqOptions = {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <VStack align="stretch" spacing="32px">
      <VStack align="stretch">
        <Heading as="h4" fontSize="24px">
          CPU Usage
        </Heading>
        <Center>
          <Bar data={cpuData} options={cpuOptions} width={800} height={800} />
        </Center>
      </VStack>
      <VStack align="stretch">
        <Heading as="h4" fontSize="24px">
          Interrupts
        </Heading>
        <Center>
          <Bar data={intrData} options={intrOptions} width={800} height={800} />
        </Center>
      </VStack>
      <VStack align="stretch">
        <Heading as="h4" fontSize="24px">
          Processes
        </Heading>
        <Center>
          <Bar data={processData} options={processOptions} width={800} height={800} />
        </Center>
      </VStack>
      <VStack align="stretch">
        <Heading as="h4" fontSize="24px">
          SoftIRQs
        </Heading>
        <Center>
          <Bar data={softirqData} options={softirqOptions} width={800} height={800} />
        </Center>
      </VStack>
    </VStack>
  );
}
