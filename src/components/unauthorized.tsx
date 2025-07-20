import { Shield, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignUp from "@/components/sign-up";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Icon and Status */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/20">
            <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground mt-2">
            You need to be signed in to access this page
          </p>
        </div>

        {/* Main Card */}
        <div className="space-y-6 rounded-lg border p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold">Authentication Required</h2>
            <p className="text-muted-foreground text-sm">
              Please sign in to continue to your dashboard and connect with your
              teammates.
            </p>
          </div>

          {/* Sign In Button */}
          <div className="flex items-center justify-center space-y-4">
            <SignUp />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-muted-foreground text-xs">
            Don't have an account? Click "Authenticate" above to get started
            with a magic link.
          </p>
        </div>
      </div>
    </div>
  );
}
