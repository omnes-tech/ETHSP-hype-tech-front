import Image from "next/image";
import { Container } from "../Container";
import { Input } from "../Input";
import { Button } from "../Button";
import { useSmartContext } from "@/contexts/smart-account";
import { useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { useVerifyUserMinted } from "@/hooks/useVerifyUserMinted";
import { StepperStore } from "@/store";
import { HeaderContainer } from "../HeaderContainer";
import { Select } from "../Input/select";
import toast from "react-hot-toast";
import { IDbuilder, IDfunder, IDsubmit } from "@/utils";

export function Step1() {
  const { smartAccount } = useSmartContext();
  const { setStep, select, email, setEmail } = StepperStore();
  const { address } = useAccount();
  const { userHasMint } = useVerifyUserMinted(address!);

  const isProf = select === "Professor";
  const isStudant = select === "Aluno";
  const isBuilder = select === "Professor" || "Aluno";
  const isFunder = select === "Financiador";
  const isLoyalt = true;

  const { writeAsync: writeBuilder } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: IDbuilder.mumbai.contractAddress,
    abi: IDbuilder.mumbai.abi,
    functionName: "mintBuilder",
    args: [email, isStudant, isProf],
  });

  const { writeAsync: writeFunder } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: IDfunder.mumbai.contractAddress,
    abi: IDfunder.mumbai.abi,
    functionName: "mintFunder",
    args: [email, isLoyalt],
  });

  const { writeAsync: writeSubmit } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: IDsubmit.mumbai.contractAddress,
    abi: IDsubmit.mumbai.abi,
    functionName: "mintFunder",
    args: [email, isLoyalt],
  });

  async function handleFunction() {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!select || !emailValid) return toast.error("Preencha as informações!");
    try {
      if (isBuilder) {
        const hash = await writeBuilder();
        toast.success("Sucesso ao Mintar!");
        console.log("builder hash: ", hash);
      } else if (isFunder) {
        const hash = await writeFunder();
        toast.success("Sucesso ao Mintar!");
        console.log("funder hash: ", hash);
      } else {
        const hash = await writeSubmit();
        toast.success("Sucesso ao Mintar!");
        console.log("submiter hash: ", hash);
      }
      setStep(2);
    } catch (error) {
      toast.error("Erro ao Mintar! Tente novamente...");
    }
    /* if (smartAccount && address && tokenId) {
      console.log("caiu");
      const nftInstance = new NFTManager(smartAccount);
      setIsTransactionInProgress(true);
      console.log(address, tokenId);
      const hashTicket = await nftInstance.mintNFT(address, tokenId);
      console.log(hashTicket);
      setHash(hashTicket);
      setShowHashLink(true);
      setIsTransactionInProgress(false);
      
    } */
  }

  return (
    <Container color={"home"} className="flex flex-col justify-start">
      <HeaderContainer />
      <div className="pt-20">
        <p className="font-medium text-4xl w-[55%] text-white">
          A <span className="text-[#0FF9F7]">melhor</span> forma de financiar e
          ganhar no desenvolvimento de profissionais e projetos inovadores.
        </p>
      </div>
      <Container className="h-[30rem] w-[30rem] mt-4 self-center shadow-2xl flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col gap-8">
          <Select />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          className="mt-8"
          disabled={userHasMint}
          onClick={handleFunction}
        >
          REGISTRO DE IDENTIDADES
        </Button>
      </Container>
      <Image
        src={"/home-left.png"}
        alt="homeleft"
        draggable={false}
        width={500}
        height={500}
        className="absolute bottom-0 left-0"
      />
      <Image
        src={"/home-right.png"}
        alt="right"
        draggable={false}
        width={500}
        height={500}
        className="absolute right-0 bottom-20"
      />
    </Container>
  );
}
