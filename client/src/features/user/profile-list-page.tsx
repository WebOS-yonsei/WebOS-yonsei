import { Avatar, Box, HStack, Heading, IconButton, Stack, Text, VStack, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from '@tanstack/react-router';
import { components } from '../@api';
import { useModal } from '../@contexts';
import { ProfileSelectModal } from './profile-select-modal';
import { useUser } from './store';

export function ProfileListPage({ profiles }: { profiles: components['schemas']['Profile'][] }) {
  const { open, close } = useModal();
  const navigate = useNavigate();
  const toast = useToast();

  const setProfileId = useUser((state) => state.setProfileId);

  const onProfileClick = (profileId: number) => () => {
    open(
      <ProfileSelectModal
        profileId={profileId}
        onClose={close}
        onSuccess={() => {
          close();
          navigate({
            to: '/video/list',
          });
          setProfileId(profileId);
        }}
      />,
    );
  };

  const onCreateButtonClick = () => {
    const MAX_PROFILE_CNT = 3;

    if (profiles.length >= MAX_PROFILE_CNT) {
      toast({
        title: '프로필 생성 오류',
        description: `프로필은 최대 ${MAX_PROFILE_CNT}개까지 생성할 수 있습니다.`,
        status: 'error',
      });
      return;
    }

    navigate({
      to: '/profile/create',
    });
  };

  return (
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
        {profiles.map((profile) => (
          <VStack key={profile.id} spacing={4} onClick={onProfileClick(profile.id!)}>
            <Avatar name={profile.nickname} src={profile.imageURI} size="2xl" />
            <Text fontWeight="light">{profile.nickname}</Text>
          </VStack>
        ))}
        <Box pb="50px" onClick={onCreateButtonClick}>
          <IconButton aria-label="create" icon={<AddIcon />} rounded="full" />
        </Box>
      </HStack>
    </Stack>
  );
}
