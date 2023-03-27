import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userMessagesListByUserIdSelector,
  userMessagesListId,
  usersListStateAtom,
} from '../users-panel';

export default function UsersChat() {
  const id = useRecoilValue(userMessagesListId);
  const userMessages = useRecoilValue(userMessagesListByUserIdSelector(id));
  return (
    <Box overflow="scroll">
      {/* <VStack> */}
      {userMessages[0]?.messages?.map((item) => {
        console.log('get user messages', item);
        return item;
      })}
      {/* </VStack> */}
    </Box>
  );
}
