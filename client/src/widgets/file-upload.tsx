import { InputGroup } from '@chakra-ui/react';
import { PropsWithChildren, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export function FileUpload({
  register,
  accept,
  multiple,
  children,
}: PropsWithChildren<{
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
}>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <input
        type="file"
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      {children}
    </InputGroup>
  );
}
