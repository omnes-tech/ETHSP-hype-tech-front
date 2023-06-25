import Image from "next/image";
import { Button } from "../Button";
import { Container } from "../Container";
import { HeaderContainer } from "../HeaderContainer";
import { Input } from "../Input";

export function Step4() {
  return (
    <Container color={"home"} className="flex flex-col justify-start">
      <HeaderContainer />
      <div className="mt-44 self-center flex flex-col items-center justify-center gap-14 w-1/2">
        <p className="font-medium text-3xl text-center text-white">
          Receba sua remuneração, pegue seus benefícios e veja sua reputação:
        </p>
        <div className="w-1/2 flex flex-col gap-14">
          <Input placeholder="ID" />
          <Button className="mt-8 w-1/2" onClick={undefined}>
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
