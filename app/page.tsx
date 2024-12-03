import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Video } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-secondary/50 text-primary backdrop-blur-sm ring-1 ring-primary/10 mb-4">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              <span>AI-Powered Video Creation</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Create Stunning Videos with
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text"> AI Magic</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into captivating short videos in seconds. No editing skills required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/dashboard">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Sign In to Create
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur-sm">
              <Video className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-primary/10">
            <p className="text-sm text-muted-foreground">
              Trusted by content creators worldwide • Enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
