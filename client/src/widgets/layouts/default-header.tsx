import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, IconButton, HStack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { MouseEventHandler } from 'react';
import { client } from '~/features/@api';
import { useUser } from '~/features/user';
import { assert } from '~/utils';
import { Link, VectorLogo } from '~/widgets';

export function DefaultHeader() {
  const naviagate = useNavigate();
  const sessionId = useUser((state) => state.sessionId);

  assert(sessionId, 'sessionId가 비어있음');

  const onProfileLinkClick: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();

    const { error } = await client.POST('/profiles/exit', {
      params: {
        query: {
          user: {
            sessionId,
          },
        },
      },
    });

    const link = e.currentTarget.getAttribute('href');
    assert(link, 'href가 비어있음');

    if (!error) {
      naviagate({
        to: link,
      });
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
        <Menu>
          <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
            <Avatar size="sm" src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
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
      </HStack>
    </Box>
  );
}
