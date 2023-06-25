import { Stepper } from "@/components/Stepper";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-full">
      <div className="bg-home bg-center bg-cover w-1/2 h-full -z-10 absolute top-0 left-0"></div>
      <Stepper />
    </main>
  );
}
