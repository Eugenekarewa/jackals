import { registerEnokiWallets } from '@mysten/enoki';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

const suiClient = new SuiClient({
	url: getFullnodeUrl('testnet'),
});

registerEnokiWallets({
	client: suiClient,
	network: 'testnet',
	apiKey: 'enoki_public_01c93fc160120bf88fce79c595614907', 
	providers: {
		google: {
			clientId: '333368837099-qaeph5r5n7r61uamq9rf1hmjq94l560v.apps.googleusercontent.com', 
		},
		facebook: {
			clientId: 'YOUR_FACEBOOK_CLIENT_ID', 
		},
		twitch: {
			clientId: 'YOUR_TWITCH_CLIENT_ID', 
		},
	},
});
