import { useState } from "react";
import { trpc } from "~/utils/trpc";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const hello = trpc.hello.useQuery({ name: "next-client" });
  if (!hello.data) return <div>Loading...</div>;
  if (hello.error) return <div>Error: {hello.error.message}</div>;

  const signUpMutation = trpc.signUp.useMutation();
  const signInMutation = trpc.signIn.useMutation();
  const onSignUp = () => {
    signUpMutation.mutate(
      {
        email: email,
        password: password,
        name: name,
      },
      {
        onSuccess: (user) => {
          console.log(user);
        },
      }
    );
  };

  const onSignIn = () => {
    signInMutation.mutate(
      {
        email: email,
        password: password,
      },
      {
        onSuccess: (user) => {
          console.log(user);
        },
      }
    );
  };
  return (
    <div>
      <p>{hello.data.greeting}</p>
      <br />
      {/* auth form */}
      <div>
        <a style={{ margin: "15px" }}>email</a>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <a style={{ margin: "15px" }}>password</a>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <a style={{ margin: "15px" }}>name</a>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button onClick={onSignUp} style={{ margin: "30px" }}>
          SignUp
        </button>
        <button onClick={onSignIn} style={{ margin: "30px" }}>
          SignIn
        </button>
      </div>
    </div>
  );
}
