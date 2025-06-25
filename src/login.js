import React, { useEffect, useState } from 'react';
import { useConnectWallet, useCurrentAccount, useWallets } from '@mysten/dapp-kit';
import { isEnokiWallet } from '@mysten/enoki';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const connect = useConnectWallet(); 
  console.log('connectWallet hook:', useConnectWallet());

  // Fix connect usage: connect is an object with mutate function
  const [loading, setLoading] = useState(true);

  const wallets = useWallets().filter(isEnokiWallet);
  const walletsByProvider = wallets.reduce((map, wallet) => {
    map.set(wallet.provider, wallet);
    return map;
  }, new Map());

  const googleWallet = walletsByProvider.get('google');
  const facebookWallet = walletsByProvider.get('facebook');

  useEffect(() => {
    if (currentAccount) {
      console.log('User logged in, navigating to gallery:', currentAccount);
      // redirect to gallery after successful login
      navigate('/gallery');
    }
  }, [currentAccount, navigate]);

  useEffect(() => {
    // simulate loading while Enoki wallets load
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full" />
        <p className="ml-4">Loading wallets...</p>
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
            onClick={() => {
              console.log('Sign in with Google clicked');
              connect.mutate({ wallet: googleWallet });
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 mb-4 rounded-full w-full transition"
          >
            Sign in with Google
          </motion.button>
        )}

        {facebookWallet && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('Sign in with Facebook clicked');
              connect.mutate({ wallet: facebookWallet });
            }}
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
