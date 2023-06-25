import Image from "next/image";
import { Button } from "../Button";
import { Container } from "../Container";
import { Input } from "../Input";
import { useVerifyUserMinted } from "@/hooks/useVerifyUserMinted";
import { HeaderContainer } from "../HeaderContainer";
import { useAccount, useContractRead } from "wagmi";
import { ProRec } from "@/utils/ProRec";
import { useState } from "react";

export function Step2() {
  const { address } = useAccount();
  const { userHasMint } = useVerifyUserMinted(address!);
  const [id, setId] = useState("");

  const { data, error } = useContractRead({
    address: ProRec.mumbai.contractAddress,
    abi: ProRec.mumbai.abi,
    functionName: "getProject",
    args: [id],
  });

  async function handleFunction() {
    console.error(error);
  }

  return (
    <Container color={"home"} className="flex flex-col justify-start">
      <HeaderContainer />
      <div className="mt-44 self-center flex flex-col items-center justify-center gap-14 w-1/2">
        <p className="font-medium text-3xl text-center text-white">
          Selecione o id do projeto que quer participar:
        </p>
        <div className="w-1/2 flex flex-col gap-14">
          <Input placeholder="ID" onChange={(e) => setId(e.target.value)} />
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
