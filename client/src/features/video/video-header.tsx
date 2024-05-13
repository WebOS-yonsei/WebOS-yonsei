import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, IconButton, HStack } from '@chakra-ui/react';
import { Link, VectorLogo } from '~/widgets';

export function VideoHeader() {
  return (
    <Box py={2} px={4} as="nav" pos="fixed" top={0} left={0} width="100%" bgColor="#0c0c0f" h="120px">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <VectorLogo />
        </Link>
        <HStack alignItems="center" spacing={4}>
          <IconButton icon={<SettingsIcon />} aria-label="setting" variant="ghost" color="white" _hover={{ bgColor: 'black' }} />
          <Menu>
            <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
              <Avatar size="sm" src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
            </MenuButton>
            <MenuList>
              <MenuItem color="black" fontSize="20px">
                프로필변경
              </MenuItem>
              <MenuItem color="black" fontSize="20px">
                로그아웃
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}
