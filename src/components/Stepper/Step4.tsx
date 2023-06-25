import Image from "next/image";
import { Button } from "../Button";
import { Container } from "../Container";
import { HeaderContainer } from "../HeaderContainer";
import { Input } from "../Input";
import { useState } from "react";
import { IDfunder } from "@/utils";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import toast from "react-hot-toast";

export function Step4() {
  const [id, setId] = useState("");
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: IDfunder.mumbai.contractAddress,
    abi: IDfunder.mumbai.abi,
    functionName: "claimCompensation",
    overrides: {
      from: address,
      gasLimit: 1000000 as unknown as BigNumber,
    },
    args: [Number(id)],
  });

  const { writeAsync } = useContractWrite(config);

  async function handleFunction() {
    if (!id) return toast.error("Preencha o ID!");
    if (!writeAsync) return toast.error("Sem mint!");
    const hash = await writeAsync();
    toast.success("Sucesso ao Reclamar!");
    console.log(hash);
  }

  return (
    <Container color={"home"} className="flex flex-col justify-start">
      <HeaderContainer />
      <div className="mt-44 self-center flex flex-col items-center justify-center gap-14 w-1/2">
        <p className="font-medium text-3xl text-center text-white">
          Receba sua remuneração, pegue seus benefícios e veja sua reputação:
        </p>
        <div className="w-1/2 flex flex-col gap-14">
          <Input
            type="number"
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
          />
          <Button className="mt-8 w-1/2" onClick={handleFunction}>
            Claim
          </Button>
        </div>
      </div>
      <Image
        src={"/4-left.png"}
        alt="left"
        draggable={false}
        width={500}
        height={500}
        className="absolute left-40 bottom-0"
      />
    </Container>
  );
}
