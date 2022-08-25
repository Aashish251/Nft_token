import './App.css';
// import Api from './Api/Api';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { YourApp } from './components/YourApp/YourApp';




const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: process.env.KEY }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider   chains={chains}  >
        <YourApp />
        {/* <Api/> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
