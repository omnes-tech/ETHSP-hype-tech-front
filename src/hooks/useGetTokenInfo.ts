import { useContractRead } from "wagmi";

/* export function useGetTokenInfo() {
  const getNFTAmount = useContractRead({
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
} */
export {}