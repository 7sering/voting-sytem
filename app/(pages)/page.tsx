import { List } from "@/app/components";
// import delay from "delay";

export default async function Home() {
  // await delay(100);
  return (
    <>
      <h2 className="text-center text-3xl pt-7 font-bold">VOTE YOUR PROJECT</h2>
      <List />
    </>
  );
}
