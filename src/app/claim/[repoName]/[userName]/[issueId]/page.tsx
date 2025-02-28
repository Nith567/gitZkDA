"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { Proof, ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import VerifyProof from '@/components/verify-proof';


export default function ContestDetails({ params }: { params: { repoName: string; userName:string,issueId: string } }) {
  const { repoName, issueId,userName } = params; 

  const [ready, setReady] = useState<boolean>(false);
  const [proof, setProof] = useState<Proof>();
  const [reclaimProofRequest, setReclaimProofRequest] = useState<ReclaimProofRequest | null>(null);
  const [requestUrl, setRequestUrl] = useState<string>("");
  const [statusUrl, setStatusUrl] = useState<string>("");

  useEffect(() => {
    async function initializeReclaim() {
      const APP_ID = "0x6E0338a6D8594101Ea9e13840449242015d71B19"; // Example App Id, replace with yours
      const APP_SECRET = "0x1e0d6a6548b72286d747b4ac9f2ad6b07eba8ad6a99cb1191890ea3f77fae48f"; // Example App Secret, replace with yours
      const PROVIDER_ID = "6d3f6753-7ee6-49ee-a545-62f1b1822ae5"; // Example Provider Id, replace with yours

      try {
        const proofRequest = await ReclaimProofRequest.init(
          APP_ID,
          APP_SECRET,
          PROVIDER_ID
        );
        setReclaimProofRequest(proofRequest);
      } catch (error) {
        console.error("Error initializing ReclaimProofRequest", error);
      }
    }

    initializeReclaim();
  }, []);


  async function generateVerificationRequest() {
    if (!reclaimProofRequest) {
      console.error("Reclaim Proof Request not initialized");
      return;
    }

    reclaimProofRequest.addContext(
      "user's address",
      "for acmecorp.com on 1st January"
    );

    try {
      const url = await reclaimProofRequest.getRequestUrl();
      setRequestUrl(url);
      setStatusUrl(reclaimProofRequest.getStatusUrl());

      await reclaimProofRequest.startSession({
        onSuccess: (proof) => {
          console.log("Verification success", proof);
          setReady(true);
          if (typeof proof === 'string') {
            setProof(undefined);
          } else {
            setProof(proof as Proof);
          }
        },
        onError: (error) => {
          console.error("Verification failed", error);
        },
      });
    } 
    
    catch (error) {
      console.error("Error generating verification request", error);
    }
  }
  return (
    <div className="max-w-4xl mx-auto min-h-screen p-8 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 rounded-xl shadow-2xl space-y-8 text-white">
      <h1 className="text-3xl font-bold">Github Repo Details</h1>
      <p className="text-lg">Repository Name: <strong>{repoName}</strong></p>
      <p className="text-lg">PR 10: <strong>{issueId}</strong></p>
      {!requestUrl && (
              <button onClick={generateVerificationRequest}>
                Create Claim QR Code
              </button>
            )}
            {requestUrl && <QRCode value={requestUrl} />}
            {ready && <VerifyProof proof={proof} repoName={repoName} userName={userName} issueId={issueId}/>}
    </div>
  );
}
