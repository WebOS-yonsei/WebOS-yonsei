import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { UserLayout } from './user-layout';

export function ProfileListPage() {
  const profiles = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Smith', age: 30 },
    { name: 'Bob Johnson', age: 35 },
  ];

  return (
    <UserLayout>
      <Stack spacing={8} mx="auto" maxW="lg">
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            프로필 선택
          </Heading>
          <Text fontSize="lg" color="gray.600">
            영상을 시청할 프로필을 선택해주세요.
          </Text>
        </Stack>
        <Box rounded="lg" boxShadow="lg" p={8}>
          <VStack spacing={4} align="start">
            {profiles.map((profile, index) => (
              <Box key={index} borderWidth="1px" p={4} borderRadius="md">
                <Text>Name: {profile.name}</Text>
                <Text>Age: {profile.age}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Stack>
    </UserLayout>
  );
}
