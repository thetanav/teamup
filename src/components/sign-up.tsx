import { signIn } from "@/server/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Authenticate</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to Teamup</DialogTitle>
          <DialogDescription>
            Enter your email address to receive a magic link.
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
          className="flex gap-3"
        >
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full"
          />
          <Button type="submit" variant={"ghost"}>
            Sign In
          </Button>
        </form>
        <DialogDescription>
          The magic link will be sent to your email address.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
