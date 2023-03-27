import { Box, Button, Input } from '@chakra-ui/react';
import React from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { userMessagesListId, usersListStateAtom } from '../users-panel';

export const userChatMessage = atom({
  key: 'userChatMessage',
  default: '',
});

export default function ChatFooter() {
  const [inputValue, setInputValue] = useRecoilState(userChatMessage);
  const id = useRecoilValue(userMessagesListId);

  const setUserMessages = useSetRecoilState(usersListStateAtom);

  const list = useRecoilValue(usersListStateAtom);

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const addUsersNewMessage = () => {
    const userUpdatedList = JSON.parse(JSON.stringify(list));
    const userUpdatedMessages = userUpdatedList.map((item) => {
      if (item.id == id) {
        item.messages = [...item.messages, inputValue];
        return item;
      }
      return item;
    });

    setInputValue('');

    setUserMessages((list) => userUpdatedMessages);
  };

  return (
    <>
      <Box mt="" display="flex">
        <Input type="text" onChange={handleOnChange} />
        <Button onClick={addUsersNewMessage}>Send</Button>
      </Box>
    </>
  );
}
