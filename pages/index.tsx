import {
  Box,
  ChakraProvider,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import styles from '../styles/Home.module.css';
import ChatFooter from './chat-footer';
import UsersChat from './users-chat';
import UsersPanel from './users-panel';
import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';

export default function Home() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div>
              {`Errors that appear here are errors that happen at render: ${error.message}`}
            </div>
          )}
        >
          <ChakraProvider>
            {/* <div> */}
            <Head>
              <title>Create Next App</title>
            </Head>
            <SimpleGrid
              columns={2}
              spacingX="40px"
              m={10}
              gap={10}
              height="100vh"
            >
              <Box>
                <UsersPanel />
              </Box>
              <VStack>
                <SimpleGrid columns={1} spacingY="1000%">
                  <Box>
                    <UsersChat />
                  </Box>
                  <Box>
                    <ChatFooter />
                  </Box>
                </SimpleGrid>
              </VStack>
            </SimpleGrid>
          </ChakraProvider>
        </ErrorBoundary>
      </React.Suspense>
    </RecoilRoot>
  );
}
