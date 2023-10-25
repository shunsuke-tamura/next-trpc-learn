import { trpc } from "~/utils/trpc";

export default function Home() {
  const hello = trpc.hello.useQuery({ name: "next-client" });
  if (!hello.data) return <div>Loading...</div>;
  if (hello.error) return <div>Error: {hello.error.message}</div>;
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}
