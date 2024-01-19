import { SignIn } from "@clerk/nextjs";
import {neobrutalism} from "@clerk/themes";

export default function Page() {
  return (
    <SignIn
      appearance={{
        baseTheme: neobrutalism,

        elements: {
          formButtonPrimary:
            "bg-slate-500 hover:bg-yellow-500 text-sm normal-case",
        },
      }}
    />
  );
}
