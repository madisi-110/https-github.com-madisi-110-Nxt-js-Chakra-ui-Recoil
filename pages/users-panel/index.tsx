import Head from 'next/head';
import React from 'react';
import {
  selector,
  useRecoilState,
  useRecoilValue,
  atom,
  selectorFamily,
} from 'recoil';
import { Box, Button, Stack, Text, VStack } from '@chakra-ui/react';
import AddNewUser from '../add-user';
import ChatFooter from '../chat-footer';

const getChatUsers = selector({
  key: 'users-selector',
  get: async ({ get }) => {
    const users = await fetch(
      `https://jsonplaceholder.typicode.com/users`
    ).then((res) => res.json());
    const userList = users.map((item, index) => {
      return {
        id: index,
        name: item.name,
        messages: [],
      };
    });
    return userList;
  },
});

export const usersListStateAtom = atom({
  key: 'usersListStateAtom',
  default: getChatUsers,
});

export const userMessagesListId = atom({
  key: 'userMessagesList',
  default: '',
});

export const userMessagesListByUserIdSelector = selectorFamily({
  key: 'userMessagesListByUserId',
  get:
    (userId) =>
    async ({ get }) => {
      const getUsers = get(usersListStateAtom);
      const users = await getUsers.filter((item) => item.id === userId);
      return users;
    },
});

export default function UsersPanel() {
  const usersList = useRecoilValue(getChatUsers);
  const users = useRecoilValue(usersListStateAtom);

  const [id, setId] = useRecoilState(userMessagesListId);

  const OpenUserMessages = (itemId) => {
    setId(itemId);
  };

  return (
    <Box bg="teal" p={2}>
      <Head>
        <title>Users</title>
      </Head>
      <VStack>
        <AddNewUser />
        <VStack>
          {users?.map((item) => {
            return (
              <Box bg="skyblue" m={2} onClick={() => OpenUserMessages(item.id)}>
                <Text p={1}>{item.name}</Text>
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
}
