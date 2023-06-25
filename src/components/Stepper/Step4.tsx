import Image from "next/image";
import { Button } from "../Button";
import { Container } from "../Container";
import { HeaderContainer } from "../HeaderContainer";
import { Input } from "../Input";
import { useState } from "react";
import toast from "react-hot-toast";
import { IDbuilder, IDfunder } from "@/utils";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BigNumber } from "ethers";
import { Web3Connection, ERC20 } from "@taikai/dappkit";

export async function Step4() {
  const [id, setId] = useState("");
  const { address } = useAccount();

  const connection = new Web3Connection({
    web3Host: process.env.WEB3_HOST_PROVIDER,
  });

  async function Claim() {
    await connection.start();
    await connection.connect();

    const erc20Deployer = new ERC20(connection);
    await erc20Deployer.loadAbi();

    const tx = await erc20Deployer.deployJsonAbi(
      "Hype-tech",
      "HYPETECH",
      "1000000000000000000000000",
      await erc20Deployer.connection.getAddress()
    );

    const myToken = new ERC20(connection, tx.contractAddress);

    await myToken.start();
    await myToken.transferTokenAmount(
      "endereco que vou te mandar",
      1000000000000000000000000 - 1
    );
  }

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

  const { data } = useContractRead({
    address: IDbuilder.mumbai.contractAddress,
    abi: IDbuilder.mumbai.abi,
    functionName: "totalSupply",
  });

  console.log(Number(data));

  async function handleFunction() {
    if (!id || !writeAsync) return toast.error("Preencha o ID!");
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
