import { Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Heading, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { z } from 'zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Link, VStack } from '~/widgets';
import { UserLayout } from './user-layout';
import { client } from '../@api';
import { useUser } from './store';

const scheme = z.object({
  loginId: z.string().min(1),
  password: z.string().min(1),
});

type Scheme = z.infer<typeof scheme>;

export function LoginPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const setSessionId = useUser((state) => state.setSessionId);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<Scheme>({
    resolver: zodResolver(scheme),
  });

  const onFormValid: SubmitHandler<Scheme> = async ({ loginId, password }) => {
    const { data, error } = await client.POST('/users/login', {
      body: {
        loginId,
        password,
      },
    });

    if (!data || error) {
      toast({
        title: '로그인 실패',
        description: '입력하신 정보를 다시 확인해주세요.',
        status: 'error',
      });
      return;
    }

    setSessionId(Number(data.sessionId));

    toast({
      title: '로그인 성공',
      description: '로그인되었습니다.',
      status: 'success',
    });

    navigate({
      to: '/profile',
    });
  };

  const onFormInvalid: SubmitErrorHandler<Scheme> = () => {
    toast({
      title: '로그인 실패',
      description: '입력하신 정보를 다시 확인해주세요.',
      status: 'error',
    });
  };

  return (
    <UserLayout>
      <VStack spacing={8} mx="auto" maxW="lg">
        <VStack align="center">
          <Heading fontSize="4xl" textAlign="center">
            로그인
          </Heading>
          <Text fontSize="lg" color="gray.600">
            영화, 시리즈 등을 무제한으로 시청하세요.
          </Text>
        </VStack>
        <Box rounded="lg" boxShadow="lg" p={8}>
          <form onSubmit={handleSubmit(onFormValid, onFormInvalid)}>
            <VStack spacing={4}>
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
              <VStack spacing={10} pt={2} align="stretch" w="full">
                <Button loadingText="Submitting" size="lg" bg="red.600" _hover={{ bg: 'red.700' }} color="white" type="submit">
                  로그인
                </Button>
              </VStack>
              <VStack pt={6}>
                <Text align="center">
                  회원이 아니신가요?{' '}
                  <Link color="red.600" to="/signup">
                    지금 가입하세요.
                  </Link>
                </Text>
              </VStack>
            </VStack>
          </form>
        </Box>
      </VStack>
    </UserLayout>
  );
}
