import { IDbuilder } from "@/utils";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

interface GetNFTAmountType {
  data: { toNumber: () => number } | undefined;
  error: any;
}

export const useVerifyUserMinted = (address: `0x${string}`) => {
  const [userHasMint, setUserHasMint] = useState<boolean>(false);
  const [nftBalance, setNftBalance] = useState<number | undefined>();

  const getNFTAmount: GetNFTAmountType = useContractRead({
    address: IDbuilder.mumbai.contractAddress,
    abi: IDbuilder.mumbai.abi,
    functionName: "balanceOf",
    args: [`${address}`],
  });

  useEffect(() => {
    if (getNFTAmount.data) {
      const NFTBalance = getNFTAmount.data?.toNumber();
      setNftBalance(NFTBalance);
    }
  }, [getNFTAmount]);

  useEffect(() => {
    if (nftBalance && nftBalance > 0) {
      setUserHasMint(true);
    }
  }, [nftBalance]);

  return { userHasMint, nftBalance };
};
