"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAccount } from "wagmi";
import { Code2, X, Menu, ArrowRight, Github, Zap, Shield, CheckCircle } from "lucide-react"
import { useEffect, useState,useCallback } from "react";
import { ModeToggle } from "@/components/mode-toggle";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { usdcAbi } from "../../utils/faucet-abi";

export function Header() {
  const account = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {}, []);



  const claimFaucet =async()=>{ 
       try {
      writeContract({
        address: '0x7b27EcE7a1bc3528Ec2cc2506f843531010A77b6',
        abi:usdcAbi,
        functionName: "claimFaucet",
        args: [3000],
      });
    } 
    catch (err) {
      console.error("Transaction error:", err);
    }
  }

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <span className="text-xl font-bold">zkGitDA</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium transition-colors hover:text-primary">
              FAQ
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
              <Button onClick={() => claimFaucet()} variant="outline">claim Faucet</Button>

            <Link href="https://github.com/apps/bountybot324">
              <Button className="w-full">Register Repo</Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {!account?.address ? (
            <ConnectButton />
          ) : (
            <ConnectButton />
          )}
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t p-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#features" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#pricing" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="#faq" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="https://github.com/apps/bountybot324">
                  <Button className="w-full">Register Repo</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
