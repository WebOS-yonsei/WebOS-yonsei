import { Avatar, Box, HStack, Heading, IconButton, Stack, Text, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { UserLayout } from './user-layout';
import { Link } from '~/widgets';

export function ProfileListPage() {
  const profiles: {
    name: string;
    src: string;
  }[] = [
    { name: 'Christian Nwamba', src: 'https://bit.ly/code-beast' },
    { name: 'Segun Adebayo', src: 'https://bit.ly/kent-c-dodds' },
  ];

  return (
    <UserLayout>
      <Stack spacing={20} mx="auto">
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            프로필 선택
          </Heading>
          <Text fontSize="lg" color="gray.600">
            시청할 프로필을 선택해주세요.
          </Text>
        </Stack>
        <HStack spacing={8} align="center">
          {profiles.map((profile, index) => (
            <VStack key={index} spacing={4}>
              <Avatar name={profile.name} src={profile.src} size="2xl" />
              <Text fontWeight="light">{profile.name}</Text>
            </VStack>
          ))}
          <Link to="/profile/create">
            <Box pb="50px">
              <IconButton aria-label="create" icon={<AddIcon />} rounded="full" />
            </Box>
          </Link>
        </HStack>
      </Stack>
    </UserLayout>
  );
}
