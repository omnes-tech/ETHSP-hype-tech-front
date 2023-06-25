/* eslint-disable no-console */
"use client";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import { ethers } from "ethers";
import type { FC } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";

type SmartContextProviderProps = {
  children: React.ReactNode;
};

type SmartContextType = {
  smartAccount: SmartAccount | null;
  scwAddress: string;
  scwLoading: boolean;
};

export const SmartContext = createContext<SmartContextType>({
  smartAccount: null,
  scwAddress: "",
  scwLoading: false,
});

export const useSmartContext = () => {
  const context = useContext(SmartContext);
  if (!context) {
    throw new Error(
      "useSmartContext must be used within a SmartContextProvider"
    );
  }
  return context;
};

export const SmartContextProvider: FC<SmartContextProviderProps> = ({
  children,
}) => {
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);
  const { data: signer } = useSigner();
  const { address } = useAccount();

  useEffect(() => {
    async function setupSmartAccount() {
      setScwAddress("");
      setScwLoading(true);
      const walletProvider = new ethers.providers.Web3Provider(
        (signer?.provider as any).provider
      );
      const sAccount = new SmartAccount(walletProvider, {
        activeNetworkId: ChainId.POLYGON_MUMBAI,
        supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
        networkConfig: [
          {
            chainId: 80001,
            dappAPIKey: "O3OQeZnU3.2dcdd4b4-b346-4873-80dd-bb3b74cf1c3a",
          },
        ],
      });

      await sAccount.init();
      const context = sAccount.getSmartAccountContext();
      setScwAddress(context.baseWallet.getAddress());
      setSmartAccount(sAccount);
      setScwLoading(false);
    }

    if (!!signer?.provider && !!address) {
      setupSmartAccount();
    }
  }, [address, signer?.provider]);

  const value = {
    smartAccount,
    scwAddress,
    scwLoading,
  };

  return (
    <SmartContext.Provider value={value}>{children}</SmartContext.Provider>
  );
};
