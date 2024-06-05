import { Heading, VStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { components } from '../@api';
import { VideoRecommendShell } from './video-recommend-shell';
import { VideoWatchingShell } from './video-watching-shell';

export function VideoListPage({ videoList, user, index }: { videoList: components['schemas']['Contents'][]; user: components['schemas']['CurrentUserResponse']; index: 0 | 1 }) {
  const navigate = useNavigate();

  return (
    <VStack align="stretch" spacing={10}>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">콘텐츠 감상</Heading>
      </VStack>
      <Tabs
        variant="soft-rounded"
        colorScheme="red"
        index={index}
        onChange={(i) =>
          navigate({
            search: () => ({ index: i }),
          })
        }
      >
        <TabList>
          {['추천', '시청중'].map((name, i) => (
            <Tab key={i}>{name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {[<VideoRecommendShell videoList={videoList} user={user} />, <VideoWatchingShell videoList={videoList} user={user} />].map((component, i) => (
            <TabPanel key={i}>{component}</TabPanel>
          ))}
          <TabPanel />
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
