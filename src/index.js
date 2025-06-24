import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './wallets';

import { SuiClientProvider, createNetworkConfig, WalletProvider } from '@mysten/dapp-kit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SuiClient } from '@mysten/sui/client';

// ✅ Manual zkLoginEnv setup for Google
const zkLoginEnv = {
  issuer: 'https://accounts.google.com',
  audience: 'https://wallet.enoki.mystenlabs.com',
  clientId: '333368837099-qaeph5r5n7r61uamq9rf1hmjq94l560v.apps.googleusercontent.com',
};

// ✅ Setup network
const { networkConfig } = createNetworkConfig({
  testnet: {
    url: 'https://fullnode.testnet.sui.io',
    websocket: 'wss://fullnode.testnet.sui.io',
  },
});

// ✅ Create react-query client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={networkConfig}
        defaultNetwork="testnet"
        client={new SuiClient({ url: networkConfig.testnet.url })}
      >
        <WalletProvider
          autoConnect={false}
          features={{
            enoki: {
              env: zkLoginEnv,
            },
          }}
        >
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
