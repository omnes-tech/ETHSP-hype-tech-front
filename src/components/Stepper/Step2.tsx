import Image from "next/image";
import { Button } from "../Button";
import { Container } from "../Container";
import { Input } from "../Input";
import { useSmartContext } from "@/contexts";
import { useVerifyUserMinted } from "@/hooks/useVerifyUserMinted";
import { StepperStore } from "@/store";
import { useState } from "react";
import { HeaderContainer } from "../HeaderContainer";

export function Step2() {
  const { smartAccount } = useSmartContext();
  const [hash, setHash] = useState<any>("");
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);
  const [showHashLink, setShowHashLink] = useState<boolean>(false);
  const { setStep } = StepperStore();
  const address = "0xb037948823BAf3d926f92E0C6e746A602dB1f8c9";
  const { userHasMint } = useVerifyUserMinted(address!);

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
    <Container color={"home"} className="flex flex-col justify-start">
      <HeaderContainer />
      <div className="mt-44 self-center flex flex-col items-center justify-center gap-14 w-1/2">
        <p className="font-medium text-3xl text-center text-white">
          Selecione o id do projeto que quer participar:
        </p>
        <div className="w-1/2 flex flex-col gap-14">
          <Input placeholder="ID" />
          <Button disabled={userHasMint} onClick={handleFunction}>
            Participar
          </Button>
        </div>
      </div>
      <Image
        src={"/2-left.png"}
        alt="homeleft"
        draggable={false}
        width={500}
        height={500}
        className="absolute bottom-0 left-0"
      />
      <Image
        src={"/2-right.png"}
        alt="right"
        draggable={false}
        width={500}
        height={500}
        className="absolute right-0 top-10"
      />
    </Container>
  );
}
