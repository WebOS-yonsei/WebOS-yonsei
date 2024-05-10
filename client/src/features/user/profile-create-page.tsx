import { Avatar, Button, Checkbox, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';
import { UserLayout } from './user-layout';
import { Link } from '~/widgets';

export function ProfileCreatePage() {
  return (
    <UserLayout>
      <VStack spacing={10} mx="auto">
        <VStack align="center">
          <Heading fontSize="4xl" textAlign="center">
            프로필 생성
          </Heading>
          <Text fontSize="lg" color="gray.600">
            시청할 프로필을 생성해주세요.
          </Text>
        </VStack>
        <form>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>이미지</FormLabel>
              <HStack spacing={6}>
                <Avatar size="xl" src="https://bit.ly/sage-adebayo" />
                <Button w="full">이미지 변경</Button>
              </HStack>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>닉네임</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>패스워드</FormLabel>
              <HStack>
                <PinInput mask>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <FormHelperText>해당 프로필만을 위한 패스워드(4자리 숫자)를 지정해주세요.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>성인여부</FormLabel>
              <Checkbox>성인입니다</Checkbox>
              <FormHelperText>성인이 아닐 경우 볼 수 있는 컨텐츠가 제한됩니다.</FormHelperText>
            </FormControl>
            <HStack justifyContent="space-between" w="full">
              <Link to="/profile" w="full">
                <Button
                  bg="red.400"
                  color="white"
                  _hover={{
                    bg: 'red.500',
                  }}
                  w="full"
                  type="reset"
                >
                  취소
                </Button>
              </Link>
              <Button
                bg="blue.400"
                color="white"
                w="full"
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
              >
                생성
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </UserLayout>
  );
}
