import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormHelperText,
  HStack,
  PinInput,
  PinInputField,
  useToast,
} from '@chakra-ui/react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '../@api';

const scheme = z.object({
  password: z.string().length(4),
});

type Scheme = z.infer<typeof scheme>;

export function ProfileSelectModal({ profileId, onClose, onSuccess }: { profileId: number; onClose: () => void; onSuccess: () => void }) {
  const toast = useToast();

  const { handleSubmit, control } = useForm<Scheme>({
    resolver: zodResolver(scheme),
  });

  const onFormValid: SubmitHandler<Scheme> = async (_data) => {
    const { error } = await client.POST('/profiles/{profileId}', {
      params: {
        path: {
          profileId,
        },
        query: {
          user: {},
        },
      },
    });

    if (error) {
      toast({
        title: '비밀번호 오류',
        description: '비밀번호를 다시 확인해주세요.',
        status: 'error',
      });
      return;
    }

    onSuccess();
  };

  const onFormError: SubmitErrorHandler<Scheme> = () => {
    toast({
      title: '비밀번호 오류',
      description: '비밀번호를 다시 확인해주세요.',
      status: 'error',
    });
  };

  return (
    <Modal isOpen onClose={onClose} size="xs">
      <ModalOverlay />
      <form onSubmit={handleSubmit(onFormValid, onFormError)}>
        <ModalContent bgColor="black">
          <ModalHeader>비밀번호</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
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
              <FormHelperText>해당 프로필의 비밀번호를 입력해주세요</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              닫기
            </Button>
            <Button colorScheme="red" type="submit">
              제출
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
