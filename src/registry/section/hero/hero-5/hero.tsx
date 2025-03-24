import { Button } from "@/registry/components/button/select";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { GalleryVerticalEnd, Mic, UploadCloud } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Content */}
      <div className="min-h-screen flex flex-col pb-6">
        <div className="flex-grow py-24 lg:py-32  flex flex-col justify-center">
          <div className="mt-0 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex justify-center items-center">
              {/* Logo */}
              <Link
                href="#"
                className="flex items-center gap-2 self-center font-medium"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                Acme Inc.
              </Link>
              {/* End Logo */}
            </div>
            <h1 className="text-3xl font-bold text-primary sm:text-4xl">
              Welcome to Your Application
            </h1>
            <p className="mt-3 text-muted-foreground">
              Your AI-powered copilot for the web
            </p>
          </div>
          {/* Search */}
          <div className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Input
                type="text"
                className="p-4 py-6 block w-full rounded-full"
                placeholder="Ask me anything..."
              />
              <div className="absolute flex top-1/2 right-2 -translate-y-1/2">
                <Button size="sm" variant="ghost" className="rounded-full">
                  <UploadCloud className="shrink-0 w-6 h-6" />
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full">
                  <Mic className="shrink-0 w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
          {/* End Search */}
        </div>
        <footer className="mt-auto max-w-4xl text-center mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">© 2025 Acme Inc.</p>
        </footer>
      </div>
      {/* End Content */}
    </>
  );
}
