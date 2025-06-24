import React from 'react';
import { useConnectWallet, useCurrentAccount, useWallets } from '@mysten/dapp-kit';
import { isEnokiWallet } from '@mysten/enoki';
import { motion } from 'framer-motion';

function Login() {
  const currentAccount = useCurrentAccount();
  const { connect } = useConnectWallet();
  const wallets = useWallets().filter(isEnokiWallet);

  const walletsByProvider = wallets.reduce((map, wallet) => {
    map.set(wallet.provider, wallet);
    return map;
  }, new Map());

  const googleWallet = walletsByProvider.get('google');
  const facebookWallet = walletsByProvider.get('facebook');

  if (currentAccount) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
        <h2 className="text-2xl font-semibold mb-2">You're signed in!</h2>
        <p className="text-lg">Address:</p>
        <p className="text-sm text-gray-400 break-words text-center">{currentAccount.address}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-800 flex items-center justify-center text-white px-4">
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-extrabold mb-4">Access Jackal Gallery</h1>
        <p className="text-gray-300 mb-8">Choose your sign-in method to continue</p>

        {googleWallet && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => connect({ wallet: googleWallet })}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 mb-4 rounded-full w-full transition"
          >
            Sign in with Google
          </motion.button>
        )}

        {facebookWallet && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => connect({ wallet: facebookWallet })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full w-full transition"
          >
            Sign in with Facebook
          </motion.button>
        )}

        {!googleWallet && !facebookWallet && (
          <p className="text-red-400 mt-4">No Enoki-compatible provider found.</p>
        )}
      </motion.div>
    </div>
  );
}

export default Login;
