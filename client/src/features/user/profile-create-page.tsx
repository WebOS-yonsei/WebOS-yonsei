import { Avatar, Button, Checkbox, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, PinInput, PinInputField, Text, VStack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChangeEventHandler, useState } from 'react';
import { FileUpload, Link } from '~/widgets';
import { client } from '../@api';
import { getImageUrl } from '~/utils';

const scheme = z.object({
  image: z.string().min(1),
  nickname: z.string().min(1),
  password: z.string().length(4),
  isAdult: z.boolean(),
});

type Scheme = z.infer<typeof scheme>;

export function ProfileCreatePage() {
  const toast = useToast();
  const router = useRouter();
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm<Scheme>({
    resolver: zodResolver(scheme),
    defaultValues: {
      isAdult: false,
    },
  });

  const [fileUrl, setFileUrl] = useState('');

  const onFormValid: SubmitHandler<Scheme> = async (data) => {
    const { error } = await client.POST('/profiles', {
      params: {
        query: {
          user: {},
        },
      },
      body: {
        nickname: data.nickname,
        profilePassword: data.password,
        profileUri: fileUrl,
        grade: data.isAdult ? 'ADULT' : 'CHILD',
      },
    });

    if (error) {
      toast({
        title: '프로필 생성 실패',
        description: '프로필 생성에 실패했습니다.',
        status: 'error',
      });
      return;
    }

    toast({
      title: '프로필 생성 성공',
      description: '프로필이 성공적으로 생성되었습니다.',
      status: 'success',
    });

    navigate({
      to: '/profile',
    });
  };

  const onFormError: SubmitErrorHandler<Scheme> = () => {
    toast({
      title: '프로필 생성 실패',
      description: '입력하신 정보를 다시 확인해주세요.',
      status: 'error',
    });
  };

  const onFileUploadChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const { data, error } = await client.POST('/file', {
      params: {
        query: {
          user: {},
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      body: {
        file,
      },
      bodySerializer: (body) => {
        const formData = new FormData();
        formData.set('file', body!.file);
        return formData;
      },
    });

    if (!data?.url || error) {
      toast({
        title: '이미지 업로드 실패',
        description: '이미지 업로드에 실패했습니다.',
        status: 'error',
      });
      return;
    }

    setFileUrl(data.url);
  };

  return (
    <VStack spacing={10} mx="auto">
      <VStack align="center">
        <Heading fontSize="4xl" textAlign="center">
          프로필 생성
        </Heading>
        <Text fontSize="lg" color="gray.600">
          시청할 프로필을 생성해주세요.
        </Text>
      </VStack>
      <form onSubmit={handleSubmit(onFormValid, onFormError)}>
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>이미지</FormLabel>
            <HStack spacing={6}>
              <Avatar size="xl" src={fileUrl !== '' ? getImageUrl(fileUrl) : undefined} />
              <FileUpload
                accept={'image/*'}
                register={register('image', {
                  onChange: onFileUploadChange,
                })}
              >
                <Button w="full">이미지 변경</Button>
              </FileUpload>
            </HStack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>닉네임</FormLabel>
            <Input type="text" {...register('nickname')} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>패스워드</FormLabel>
            <HStack>
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                  <PinInput mask value={value} onChange={(val) => onChange(val)}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <PinInputField key={i} />
                    ))}
                  </PinInput>
                )}
              />
            </HStack>
            <FormHelperText>해당 프로필만을 위한 패스워드(4자리 숫자)를 지정해주세요.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>성인여부</FormLabel>
            <Checkbox {...register('isAdult')}>성인입니다</Checkbox>
            <FormHelperText>성인이 아닐 경우 볼 수 있는 컨텐츠가 제한됩니다.</FormHelperText>
          </FormControl>
          <HStack justifyContent="space-between" w="full">
            <Link to="/profile" w="50%">
              <Button size="lg" w="full" type="reset" onClick={() => router.history.back()}>
                취소
              </Button>
            </Link>
            <Button size="lg" w="50%" bg="red.600" _hover={{ bg: 'red.700' }} color="white" type="submit">
              생성
            </Button>
          </HStack>
        </VStack>
      </form>
    </VStack>
  );
}
