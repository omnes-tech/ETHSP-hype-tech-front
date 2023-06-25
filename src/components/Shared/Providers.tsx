"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { PropsWithChildren } from "react";
import React from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { SmartContextProvider } from "@/contexts";
import { Layout } from "./Layout";

const { chains, provider, webSocketProvider } = configureChains(
  [
    polygon,
    goerli,
    polygonMumbai,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = "YOUR_PROJECT_ID";

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Omnes Blockchain",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Omens Wallet Connector",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

interface Web3ProviderProps {
  children: React.ReactNode;
}
export const Providers: React.FC<PropsWithChildren<Web3ProviderProps>> = ({
  children,
}) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        <SmartContextProvider>
          <Layout>{children}</Layout>
        </SmartContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
