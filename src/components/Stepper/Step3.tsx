import Image from "next/image";
import { Button } from "../Button";
import { Container } from "../Container";
import { HeaderContainer } from "../HeaderContainer";
import { Input } from "../Input";

export function Step3() {
  return (
    <Container color={"home"} className="flex flex-col justify-start">
      <HeaderContainer />
      <div className="mt-44 self-center flex flex-col items-center justify-center gap-14 w-1/2">
        <p className="font-medium text-3xl text-center text-white">
          Entregue seu progresso no projeto
        </p>
        <div className="w-1/2 flex flex-col gap-14">
          <Input placeholder="ID" />
          <Input placeholder="Link" />
          <Button onClick={undefined}>Entregar</Button>
        </div>
      </div>
      <Image
        src={"/3-left.png"}
        alt="homeleft"
        draggable={false}
        width={500}
        height={500}
        className="absolute bottom-0 left-0"
      />
    </Container>
  );
}
