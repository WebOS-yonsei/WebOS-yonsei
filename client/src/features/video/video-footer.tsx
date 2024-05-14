import { Stack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from '~/widgets';

export function VideoFooter() {
  return (
    <VStack color="gray.700" bgColor="#0c0c0f" p={4} spacing={8} align="stretch">
      <SimpleGrid columns={3} spacing={8}>
        <Stack align="flex-start">
          <Text fontWeight="bold" fontSize="20px">
            Company
          </Text>
          {['About Us', 'Blog', 'Careers', 'Contact Us'].map((item, i) => (
            <Link href="/" key={i} fontSize="16px">
              {item}
            </Link>
          ))}
        </Stack>
        <Stack align="flex-start">
          <Text fontWeight="bold" fontSize="20px">
            Support
          </Text>
          {['Help Center', 'Safety Center', 'Community Guidelines'].map((item, i) => (
            <Link href="/" key={i} fontSize="16px">
              {item}
            </Link>
          ))}
        </Stack>
        <Stack align="flex-start">
          <Text fontWeight="bold" fontSize="20px">
            Legal
          </Text>
          {['Cookies Policy', 'Privacy Policy', 'Terms of Service'].map((item, i) => (
            <Link href="/" key={i} fontSize="16px">
              {item}
            </Link>
          ))}
        </Stack>
      </SimpleGrid>
      <Text fontSize="20px">© 2024 Connected Platform Group No.1. All rights reserved</Text>
    </VStack>
  );
}
