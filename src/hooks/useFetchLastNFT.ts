import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';

export {}

/* interface LastTotalSupply {
  data: { toNumber: () => number } | undefined;
  error: any;
}

export const useLastTokenId = () => {
  const [lastTokenId, setLastTokenId] = useState<number | undefined>(undefined);

  const getLastTotalSupply: LastTotalSupply = useContractRead({
    address: legalEnginnerContract.polygon.contractAddress,
    abi: legalEnginnerContract.polygon.abi,
    functionName: 'totalSupply',
  });

  useEffect(() => {
    if (getLastTotalSupply.data) {
      const tokenID = getLastTotalSupply.data?.toNumber();
      setLastTokenId(tokenID);
    }
  }, [getLastTotalSupply]);

  return lastTokenId;
};
 */