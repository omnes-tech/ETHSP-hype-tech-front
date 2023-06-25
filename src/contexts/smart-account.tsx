/* eslint-disable no-console */
'use client'
import { ChainId } from '@biconomy/core-types';
import SmartAccount from '@biconomy/smart-account';
import { ethers } from 'ethers';
import type { FC } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';

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
  scwAddress: '',
  scwLoading: false,
});

export const useSmartContext = () => {
  const context = useContext(SmartContext);
  if (!context) {
    throw new Error(
      'useSmartContext must be used within a SmartContextProvider'
    );
  }
  return context;
};

export const SmartContextProvider: FC<SmartContextProviderProps> = ({
  children,
}) => {
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
  const [scwAddress, setScwAddress] = useState('');
  const [scwLoading, setScwLoading] = useState(false);
  const { data: signer } = useSigner();
  const { address } = useAccount();

  useEffect(() => {
    async function setupSmartAccount() {
      setScwAddress('');
      setScwLoading(true);
      const walletProvider = new ethers.providers.Web3Provider(
        (signer?.provider as any).provider
      );
      const sAccount = new SmartAccount(walletProvider, {
        activeNetworkId: ChainId.POLYGON_MAINNET,
        supportedNetworksIds: [ChainId.POLYGON_MAINNET],
        networkConfig: [
          {
            chainId: 137,
            dappAPIKey: 'yKVYUwzaf.7391e07c-2183-4d3c-8bdd-e4c7a2db9a67',
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
      console.log('Provider...', signer?.provider);
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
