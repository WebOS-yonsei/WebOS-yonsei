import { Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { z } from 'zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '~/widgets';
import { UserLayout } from './user-layout';
import { client } from '../@api';

const scheme = z.object({
  loginId: z.string().min(1),
  password: z.string().min(1),
});

type Scheme = z.infer<typeof scheme>;

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<Scheme>({
    resolver: zodResolver(scheme),
  });

  const onFormValid: SubmitHandler<Scheme> = async ({ loginId, password }) => {
    const res = await client.POST('/users/login', {
      body: {
        loginId,
        password,
      },
    });
    // eslint-disable-next-line no-console
    console.log(res);
  };

  const onFormInvalid: SubmitErrorHandler<Scheme> = (err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  };

  return (
    <UserLayout>
      <Stack spacing={8} mx="auto" maxW="lg">
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            로그인
          </Heading>
          <Text fontSize="lg" color="gray.600">
            영화, 시리즈 등을 무제한으로 시청하세요.
          </Text>
        </Stack>
        <Box rounded="lg" boxShadow="lg" p={8}>
          <form onSubmit={handleSubmit(onFormValid, onFormInvalid)}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>아이디</FormLabel>
                <Input type="text" {...register('loginId')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>비밀번호</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} {...register('password')} />
                  <InputRightElement h="full">
                    <Button variant="ghost" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button loadingText="Submitting" size="lg" bg="red.600" _hover={{ bg: 'red.700' }} color="white" type="submit">
                  로그인
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align="center">
                  회원이 아니신가요?{' '}
                  <Link color="red.600" to="/signup">
                    지금 가입하세요.
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </UserLayout>
  );
}
