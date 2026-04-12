'use client';

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import ChatBox from './ChatBox.jsx';

export default function Chat() {
  const ablyApiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY;
  if (!ablyApiKey) {
    console.error('Ably API key is not configured');
    return <div>Chat is unavailable: missing configuration.</div>;
  }

  const client = new Ably.Realtime({ key: ablyApiKey });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="chat-demo">
        <ChatBox />
      </ChannelProvider>
    </AblyProvider>
  );
}