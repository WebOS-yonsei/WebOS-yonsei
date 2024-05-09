import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from '../../widgets';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            로그인하기
          </Heading>
          <Text fontSize="lg" color="gray.600">
            영화, 시리즈 등을 무제한으로 시청하세요.
          </Text>
        </Stack>
        <Box rounded="lg" boxShadow="lg" p={8}>
          <form>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>아이디</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>비밀번호</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h="full">
                    <Button variant="ghost" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                >
                  로그인
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align="center">
                  회원이 아닌가요?{' '}
                  <Link color="blue.400" to="/signup">
                    지금 가입하세요.
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
