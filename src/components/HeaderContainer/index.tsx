import Image from "next/image";
import { Button } from "../Button";
import { StepperStore } from "@/store";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export function HeaderContainer() {
  const { setStep } = StepperStore();
  const { address } = useAccount();
  const firstFour = address?.substring(0, 4);
  const lastFour = address?.slice(-4);
  const result = `${firstFour}...${lastFour}`;

  async function handleFunction() {
    /* if (smartAccount && address && tokenId) {
      console.log("casdas");
      const nftInstance = new NFTManager(smartAccount);
      setIsTransactionInProgress(true);
      console.log(address, tokenId);
      const hashTicket = await nftInstance.mintNFT(address, tokenId);
      console.log(hashTicket);
      setHash(hashTicket);
      setShowHashLink(true);
      setIsTransactionInProgress(false);
    } */
    setStep(2);
  }

  return (
    <div className="flex justify-between items-center">
      <Image src={"/logo.png"} alt="logo" width={200} height={200} />
      <div className="flex gap-4 items-center text-white">
        <p onClick={() => setStep(1)} className="cursor-pointer">
          HOME
        </p>
        <p onClick={() => setStep(3)} className="cursor-pointer">
          ENTREGAR PROJETO
        </p>
        <p onClick={() => setStep(2)} className="cursor-pointer">
          SELECIONAR ID
        </p>
        <p onClick={() => setStep(4)} className="cursor-pointer">
          RECEBER REMUNERAÇÃO
        </p>
      </div>
      <ConnectButton.Custom>
        {({ openConnectModal }) => {
          return (
            <div>
              <Button
                className="px-8 border-[#CCFF00]"
                onClick={openConnectModal}
                disabled={!!address}
              >
                {address ? result : "Connect Wallet"}
              </Button>
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
