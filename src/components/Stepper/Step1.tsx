import Image from "next/image";
import { Container } from "../Container";
import { Input } from "../Input";
import { Button } from "../Button";
import { useSmartContext } from "@/contexts/smart-account";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { StepperStore } from "@/store";
import { HeaderContainer } from "../HeaderContainer";
import { Select } from "../Input/select";
import toast from "react-hot-toast";
import { IDfunder, IDsubmit, NFTManager } from "@/utils";
import { BigNumber } from "ethers";
import { useLastTokenId } from "@/hooks/useFetchLastNFT";

export function Step1() {
  const { smartAccount } = useSmartContext();
  const { select, email, setEmail } = StepperStore();
  const tokenId = useLastTokenId();
  const { address } = useAccount();
  const isProf = select === "Professor";
  const isStudant = select === "Aluno";
  const isBuilder = select === "Professor" || select === "Aluno";
  const isFunder = select === "Financiador";
  const isLoyalt = false;

  const { config: configFunder } = usePrepareContractWrite({
    address: IDfunder.mumbai.contractAddress,
    abi: IDfunder.mumbai.abi,
    functionName: "mintFunder",
    overrides: {
      from: address,
      gasLimit: 1000000 as unknown as BigNumber,
    },
    args: [email, isLoyalt],
  });

  const { config: configSubmit } = usePrepareContractWrite({
    address: IDsubmit.mumbai.contractAddress,
    abi: IDsubmit.mumbai.abi,
    functionName: "mintSubmit",
    overrides: {
      from: address,
      gasLimit: 1000000 as unknown as BigNumber,
    },
    args: [email],
  });

  const { writeAsync: writeFunder } = useContractWrite(configFunder);

  const { writeAsync: writeSubmit } = useContractWrite(configSubmit);

  async function handleFunction() {
    if (smartAccount && address) {
      toast.loading("Mintando...", { duration: 3000 });
      if (isBuilder) {
        const nftInstance = new NFTManager(smartAccount);
        const hashTicket = await nftInstance.mintNFT(
          address,
          email,
          isStudant,
          isProf,
          tokenId!
        );
        toast.success("Sucesso ao Mintar!");
        console.log(hashTicket);
      } else if (isFunder && writeFunder) {
        const hash = await writeFunder();
        toast.success("Sucesso ao Mintar!");
        console.log(hash);
      } else if (!isFunder && !isBuilder && writeSubmit) {
        const hash = await writeSubmit();
        toast.success("Sucesso ao Mintar!");
        console.log(hash);
      }
    }
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
        <Button className="mt-8" onClick={handleFunction}>
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
