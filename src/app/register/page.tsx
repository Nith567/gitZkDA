"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Github, DollarSign } from "lucide-react"
import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { abi } from "../../../utils/zkabi"
import { usdcAbi } from "../../../utils/faucet-abi"
export default function RegisterRepo() {
  const router = useRouter()
  const [isYearly, setIsYearly] = useState(false)
  const [formData, setFormData] = useState({
    repoName: "",
    repoOwner: "",
    easyReward: 0,
    mediumReward: 0,
    hardReward: 0,
    funds: 0
  })
  const { data: hash, isPending, writeContract, error } = useWriteContract();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
    const usdcAddress = "0xD0f738050ccbBB66CD8098378b09fd62075D43b8"; 
    const contractAddress="0xa80fd684430159D35ce22dC137315353Bb9d9326"
    const subscriptionCost = isYearly ? 200 : 20

  const ApproveFunds = async() => {
    try {
    await writeContract({
      address: usdcAddress,
      abi: usdcAbi,
      functionName: "approve",
      args: [contractAddress, formData.funds * 1e6 + (isYearly ? 200 : 20)*1e6],
    });
      } catch (err) {
        console.error("Transaction error:", err);
      }
    }
  const paySubscription = async() => {
    try {
      await writeContract({
        address: contractAddress,
        abi,
        functionName: "paySubscription",
        args: [`${formData.repoOwner}/${formData.repoName}`,isYearly],
      });
      } catch (err) {
        console.error("Transaction error:", err);
      }
    }


    const RegisterRepo= async () => {
     try {

          await  writeContract({
        address:contractAddress,
        abi,
        functionName: "registerRepo",
        args: [`${formData.repoOwner}/${formData.repoName}`,formData.repoOwner,formData.repoName,[formData.easyReward,formData.mediumReward,formData.hardReward]],
      });
    } catch (err) {
      console.log("Transaction error:", err);
    }
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      console.log("handle submit")
    }
const PayFunds= async ()=>{
  try{
  await writeContract({
    address: contractAddress,
    abi,
    functionName: "depositFunds",
    args: [`${formData.repoOwner}/${formData.repoName}`,formData.funds * 1e6],
  });
}
catch (err) {
  console.error("Transaction error:", err);
}
}


  const isFormValid = () => {
    return (
      formData.repoName &&
      formData.repoOwner &&
      formData.funds > 0 &&
      formData.easyReward >= 0 &&
      formData.mediumReward >= 0 &&
      formData.hardReward >= 0
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="text-xl font-bold">zkGitDA</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Register Your GitHub Repository</CardTitle>
            <CardDescription>Set up automatic USDC rewards for your developers</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="repoName">Repository Name</Label>
                <Input
                  id="repoName"
                  name="repoName"
                  placeholder="e.g. my-awesome-project"
                  value={formData.repoName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="funds">Deposit Funds</Label>
                <Input
                  id="funds"
                  name="funds"
                  placeholder="$100-5000"
                  value={formData.funds}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repoOwner">Repository Owner (Organization User)</Label>
                <Input
                  id="repoOwner"
                  name="repoOwner"
                  placeholder="e.g. github-org-name"
                  value={formData.repoOwner}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">USDC Reward Allocation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="easyReward">Easy Difficulty (USDC)</Label>
                    <Input
                      id="easyReward"
                      name="easyReward"
                      type="number"
                      placeholder="e.g. 10"
                      value={formData.easyReward}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mediumReward">Medium Difficulty (USDC)</Label>
                    <Input
                      id="mediumReward"
                      name="mediumReward"
                      type="number"
                      placeholder="e.g. 20"
                      value={formData.mediumReward}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hardReward">Hard Difficulty (USDC)</Label>
                    <Input
                      id="hardReward"
                      name="hardReward"
                      type="number"
                      placeholder="e.g. 50"
                      value={formData.hardReward}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="subscription-type" checked={isYearly} onCheckedChange={setIsYearly} />
                <Label htmlFor="subscription-type">{isYearly ? "Yearly Subscription" : "Monthly Subscription"}</Label>
              </div>
              <div className="text-sm text-muted-foreground">
                Subscription cost: {subscriptionCost} USDC {isYearly ? "per year" : "per month"}
              </div>
              <Button onClick={ApproveFunds} variant="outline" className="w-full" disabled={!isFormValid()}>
                <DollarSign className="mr-2 h-4 w-4" /> Approve
              </Button>
              <Button onClick={ paySubscription} variant="outline" className="w-full" disabled={!isFormValid()}>
                <DollarSign className="mr-2 h-4 w-4" /> Pay Subscription
              </Button>
              <Button onClick={RegisterRepo } variant="outline" className="w-full" disabled={!isFormValid()}>
                <DollarSign className="mr-2 h-4 w-4" /> Register Repo
              </Button>
              <Button onClick={PayFunds} variant="outline" className="w-full" disabled={!isFormValid()}>
                <DollarSign className="mr-2 h-4 w-4" /> Pay Funds
              </Button>
            </form>
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

