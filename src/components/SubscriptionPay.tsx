import { Code2, X, Menu, ArrowRight, Github, Zap, Shield, CheckCircle } from "lucide-react"
import React, { useCallback } from 'react'
import Link from "next/link"
import { Button } from "./ui/button"
import { transformForOnchain } from "@reclaimprotocol/js-sdk";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";


export default function SubscriptionPay() {

  return (

<section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
<div className="container px-4 md:px-6">
  <div className="flex flex-col items-center justify-center space-y-4 text-center">
    <div className="space-y-2">
      <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
        Pricing
      </div>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        Simple, Transparent Pricing
      </h2>
      <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        Choose the plan that works best for your organization.
      </p>
    </div>
  </div>
  <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
    <div className="flex flex-col rounded-lg border bg-background shadow-sm">
      <div className="p-6">
        <h3 className="text-2xl font-bold">Monthly</h3>
        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <circle cx="20" cy="20" r="20" fill="#2775CA"/>
            <path d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8ZM24.0504 24.5251H22.3383C22.3383 24.5251 22.3383 21.5778 22.3383 21.5442C22.3383 20.6899 21.9363 20.3215 21.3331 20.3215C20.5798 20.3215 20.3121 20.7235 20.3121 21.5442V24.5251H18.6C18.6 24.5251 18.6 19.5341 18.6 17.4748H20.3121V18.2617C20.3121 18.2617 20.8816 17.4748 22.1384 17.4748C23.4289 17.4748 24.0504 18.3627 24.0504 19.9737V24.5251ZM16.8879 16.6879C16.1009 16.6879 15.5651 16.1521 15.5651 15.4989C15.5651 14.8457 16.1009 14.3099 16.8879 14.3099C17.6412 14.3099 18.177 14.8457 18.177 15.4989C18.177 16.1521 17.6412 16.6879 16.8879 16.6879ZM17.7414 24.5251H15.9956V17.4748H17.7414V24.5251Z" fill="white"/>
          </svg>
          20
          <span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
        </div>
        <p className="mt-4 text-muted-foreground">
          Perfect for organizations that want flexibility.
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-between rounded-b-lg bg-muted/50 p-6">
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Connect unlimited repositories</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Automated USDC payments</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>PR difficulty labeling</span>
          </li>
        </ul>
        <button className="mt-8">Subscribe Monthly</button>
      </div>
    </div>
    <div className="flex flex-col rounded-lg border bg-background shadow-sm relative overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold">Yearly</h3>
        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <circle cx="20" cy="20" r="20" fill="#2775CA"/>
            <path d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8ZM24.0504 24.5251H22.3383C22.3383 24.5251 22.3383 21.5778 22.3383 21.5442C22.3383 20.6899 21.9363 20.3215 21.3331 20.3215C20.5798 20.3215 20.3121 20.7235 20.3121 21.5442V24.5251H18.6C18.6 24.5251 18.6 19.5341 18.6 17.4748H20.3121V18.2617C20.3121 18.2617 20.8816 17.4748 22.1384 17.4748C23.4289 17.4748 24.0504 18.3627 24.0504 19.9737V24.5251ZM16.8879 16.6879C16.1009 16.6879 15.5651 16.1521 15.5651 15.4989C15.5651 14.8457 16.1009 14.3099 16.8879 14.3099C17.6412 14.3099 18.177 14.8457 18.177 15.4989C18.177 16.1521 17.6412 16.6879 16.8879 16.6879ZM17.7414 24.5251H15.9956V17.4748H17.7414V24.5251Z" fill="white"/>
          </svg>
          200
          <span className="ml-1 text-xl font-medium text-muted-foreground">/year</span>
        </div>
        <p className="mt-4 text-muted-foreground">
          Best value for committed organizations.
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-between rounded-b-lg bg-muted/50 p-6">
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Connect unlimited repositories</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Automated USDC payments</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>PR difficulty labeling</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Priority support</span>
          </li>
        </ul>
          <Button className="w-full mt-8">Subscribe Yearly</Button>
      </div>
    </div>
  </div>
</div>
</section>
  )
}
