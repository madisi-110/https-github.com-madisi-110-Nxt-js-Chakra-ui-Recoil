import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { usersListStateAtom } from './users-panel';

const inputFieldValue = atom({
  key: 'inputFieldValue',
  default: '',
});

export default function TransitionExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useRecoilState(inputFieldValue);
  const setUsersUpdatedList = useSetRecoilState(usersListStateAtom);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addNewUser = () => {
    setUsersUpdatedList((list) => [
      ...list,
      {
        id: new Date(),
        name: value,
        messages: [],
      },
    ]);
    setValue('');
  };

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Button onClick={onOpen}>Add New User</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter User Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <Input
              type="text"
              value={value}
              onChange={handleOnChange}
              ref={inputRef}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={addNewUser}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
