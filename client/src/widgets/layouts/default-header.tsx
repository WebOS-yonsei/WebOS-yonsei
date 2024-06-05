import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, IconButton, HStack } from '@chakra-ui/react';
import { Await, DeferredPromise, useNavigate } from '@tanstack/react-router';
import { MouseEventHandler, Suspense } from 'react';
import { client, components } from '~/features/@api';
import { useUser } from '~/features/user';
import { getImageUrl } from '~/utils';
import { Link, VectorLogo } from '~/widgets';

export function DefaultHeader({ user }: { user: DeferredPromise<components['schemas']['CurrentUserResponse']> }) {
  const naviagate = useNavigate();
  const setProfileId = useUser((state) => state.setProfileId);

  const onProfileLinkClick: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();

    const { error } = await client.POST('/profiles/exit', {
      params: {
        query: {
          user: {},
        },
      },
    });

    if (!error) {
      setProfileId(undefined);
      setTimeout(() => {
        naviagate({
          to: '/profile',
        });
      }, 300);
    }
  };

  return (
    <Box py={2} px={4} as="nav" pos="fixed" top={0} left={0} width="100%" bgColor="#0c0c0f" alignItems="center" justifyContent="space-between" display="flex" zIndex={100}>
      <Link to="/video/list">
        <VectorLogo />
      </Link>
      <HStack alignItems="center" spacing={4}>
        <Link to="/system">
          <IconButton icon={<SettingsIcon />} aria-label="setting" variant="ghost" color="white" _hover={{ bgColor: 'black' }} />
        </Link>
        <Suspense fallback={null}>
          <Await promise={user}>
            {(data) => (
              <Menu>
                <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                  <Avatar size="sm" src={data.profileURI ? getImageUrl(data.profileURI) : undefined} />
                </MenuButton>
                <MenuList>
                  <Link to="/profile" onClick={onProfileLinkClick}>
                    <MenuItem color="black" fontSize="20px">
                      프로필변경
                    </MenuItem>
                  </Link>
                  <MenuItem color="black" fontSize="20px">
                    로그아웃
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Await>
        </Suspense>
      </HStack>
    </Box>
  );
}
