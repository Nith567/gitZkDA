import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import {Input} from "@/components/ui/input"; 
import { Code2, X, Menu, ArrowRight, Github, Zap, Shield, CheckCircle } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import SubscriptionPay from "./SubscriptionPay";
export function Body() {
  const router = useRouter();

  return (
    <main className="flex-1 min-h-screen">
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Reward Developers Automatically with Crypto
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Connect your GitHub repositories and let our bot automatically reward developers with USDC when their PRs are merged.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-1">
                  Register Your Repo <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="relative flex items-center justify-center h-full w-full">
                <div className="flex flex-col items-center">
                  <Github className="h-24 w-24 text-primary mb-4" />
                  <div className="flex items-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <circle cx="20" cy="20" r="20" fill="#2775CA"/>
                      <path d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8ZM24.0504 24.5251H22.3383C22.3383 24.5251 22.3383 21.5778 22.3383 21.5442C22.3383 20.6899 21.9363 20.3215 21.3331 20.3215C20.5798 20.3215 20.3121 20.7235 20.3121 21.5442V24.5251H18.6C18.6 24.5251 18.6 19.5341 18.6 17.4748H20.3121V18.2617C20.3121 18.2617 20.8816 17.4748 22.1384 17.4748C23.4289 17.4748 24.0504 18.3627 24.0504 19.9737V24.5251ZM16.8879 16.6879C16.1009 16.6879 15.5651 16.1521 15.5651 15.4989C15.5651 14.8457 16.1009 14.3099 16.8879 14.3099C17.6412 14.3099 18.177 14.8457 18.177 15.4989C18.177 16.1521 17.6412 16.6879 16.8879 16.6879ZM17.7414 24.5251H15.9956V17.4748H17.7414V24.5251Z" fill="white"/>
                    </svg>
                    <span className="text-xl font-bold">USDC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How It Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform bridges GitHub repositories with crypto payments in just a few simple steps.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">1</div>
            <h3 className="text-xl font-bold">Register Your Repo</h3>
            <p className="text-center text-muted-foreground">
              Connect your GitHub organization and select the repositories you want to enable for automatic rewards.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">2</div>
            <h3 className="text-xl font-bold">Label Your PRs</h3>
            <p className="text-center text-muted-foreground">
              Assign difficulty levels (&apos;easy&apos;, &apos;medium&apos;, &apos;hard&apos;) to pull requests to determine reward amounts.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">3</div>
            <h3 className="text-xl font-bold">Automatic Payments</h3>
            <p className="text-center text-muted-foreground">
              When PRs are merged, developers automatically receive USDC rewards based on the difficulty level.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Why Organizations Choose Us
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform streamlines developer rewards and incentivizes quality contributions.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Instant Payments</h3>
            <p className="text-center text-muted-foreground">
              Developers receive USDC rewards immediately when their PRs are merged, no manual processing required.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Transparent Rewards</h3>
            <p className="text-center text-muted-foreground">
              Clear difficulty levels ensure fair compensation based on the complexity of contributions.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Seamless Integration</h3>
            <p className="text-center text-muted-foreground">
              Our bot works directly with your GitHub workflow with minimal setup and configuration.
            </p>
          </div>
        </div>
      </div>
    </section>
 <SubscriptionPay/>

  </main>
  );
}
