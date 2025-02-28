'use client'
import { useState, useEffect } from "react";
import { abi } from "../../utils/zkabi";
import { transformForOnchain } from "@reclaimprotocol/js-sdk";
import { Button } from "@/components/ui/button";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

interface VerifyProofProps {
  proof: any;
  repoName: string;
  userName:string;
  issueId: string;
}

export default function VerifyProof({ proof: rawProof, repoName,userName, issueId }: VerifyProofProps) {
  const [proof, setProof] = useState<any>({});
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (rawProof && Object.keys(rawProof).length > 0) {
      setProof(transformForOnchain(rawProof));
    }
  }, [rawProof]);

  async function claimPrize() {
    try {
      writeContract({
        address: '0xa80fd684430159D35ce22dC137315353Bb9d9326',
        abi,
        functionName: "claimReward",
        args: [`${repoName}/${userName}`, issueId, proof],
      });
    } catch (err) {
      console.error("Transaction error:", err);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Congratulations ! & Claim Reward</h2>
      <p><strong>Repository:</strong> {repoName}</p>
      <p><strong>Issue ID:</strong> {issueId}</p>

      {isConfirmed ? (
        <p className="text-green-400 mt-4">Reward successfully claimed!</p>
      ) : (
        <Button
          onClick={claimPrize}
          disabled={isPending || isConfirming}
          className="mt-4"
        >
          {isPending || isConfirming ? "Processing..." : "Claim Prize"}
        </Button>
      )}

      {error && <p className="text-red-400 mt-2">Error: {error.message}</p>}
    </div>
  );
}
