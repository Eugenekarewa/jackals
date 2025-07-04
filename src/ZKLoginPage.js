import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnokiFlow } from '@mysten/enoki';

const SUPPORTED_PROVIDERS = ['google', 'facebook', 'twitter']; // Example supported providers

function ZKLoginPage() {
  const [zkAddress, setZkAddress] = useState(null);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState('google'); // Default provider
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyAuthed = localStorage.getItem('zklogin_signature');
    if (alreadyAuthed) {
      // Skip login and go to gallery
      navigate('/gallery');
      return;
    }

    const runEnokiFlow = async () => {
      try {
        if (!SUPPORTED_PROVIDERS.includes(provider)) {
          throw new Error(`Provider "${provider}" is not supported. Supported providers: ${SUPPORTED_PROVIDERS.join(', ')}`);
        }

        const flow = new EnokiFlow({
          provider,
          network: 'testnet',
          clientId: '333368837099-79d6vv7coil9b0qal998cd7jcv1qukh3.apps.googleusercontent.com',
        });

        const zkLoginResult = await flow.signIn();

        setZkAddress(zkLoginResult.address);
        localStorage.setItem('zklogin_signature', JSON.stringify(zkLoginResult.zkLoginSignature));

        setTimeout(() => navigate('/gallery'), 1000);
      } catch (err) {
        console.error('Enoki zkLogin Error:', err);
        setError(err.message || 'Error during zkLogin. Check console for details.');
      }
    };

    runEnokiFlow();
  }, [navigate, provider]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">zkLogin via Enoki</h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {zkAddress ? (
          <div>
            <p className="mb-2 text-green-300">✅ zkLogin Address:</p>
            <code className="block bg-gray-700 p-2 rounded text-sm break-all text-indigo-300 mb-4">
              {zkAddress}
            </code>
            <p className="text-sm text-gray-400">Redirecting to gallery...</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-300 animate-pulse">
              Authenticating and deriving zkLogin address...
            </p>
            <div className="mt-4">
              <label htmlFor="provider-select" className="block mb-2 text-sm text-gray-400">
                Choose sign-in provider:
              </label>
              <select
                id="provider-select"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded w-full"
              >
                {SUPPORTED_PROVIDERS.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov.charAt(0).toUpperCase() + prov.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ZKLoginPage;
