export const abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "SafeERC20FailedOperation",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "repoId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "repoId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "owner",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "repo",
				"type": "string"
			}
		],
		"name": "RepoRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "repoId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "issueId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "orgId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "expiry",
				"type": "uint256"
			}
		],
		"name": "SubscriptionPaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "repoId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "issueId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "winner",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "difficulty",
				"type": "uint8"
			}
		],
		"name": "WinnerAssigned",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "OWNER",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "USDC",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "repoId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issueId",
				"type": "string"
			},
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "provider",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "parameters",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "context",
								"type": "string"
							}
						],
						"internalType": "struct Claims.ClaimInfo",
						"name": "claimInfo",
						"type": "tuple"
					},
					{
						"components": [
							{
								"components": [
									{
										"internalType": "bytes32",
										"name": "identifier",
										"type": "bytes32"
									},
									{
										"internalType": "address",
										"name": "owner",
										"type": "address"
									},
									{
										"internalType": "uint32",
										"name": "timestampS",
										"type": "uint32"
									},
									{
										"internalType": "uint32",
										"name": "epoch",
										"type": "uint32"
									}
								],
								"internalType": "struct Claims.CompleteClaimData",
								"name": "claim",
								"type": "tuple"
							},
							{
								"internalType": "bytes[]",
								"name": "signatures",
								"type": "bytes[]"
							}
						],
						"internalType": "struct Claims.SignedClaim",
						"name": "signedClaim",
						"type": "tuple"
					}
				],
				"internalType": "struct Reclaim.Proof",
				"name": "proof",
				"type": "tuple"
			}
		],
		"name": "claimReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "repoId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "depositFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "hasClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "issueLabels",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "mergedWinners",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "orgId",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "yearly",
				"type": "bool"
			}
		],
		"name": "paySubscription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reclaimAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "repoId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "githubOwner",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "githubRepo",
				"type": "string"
			},
			{
				"internalType": "uint256[]",
				"name": "rewards",
				"type": "uint256[]"
			}
		],
		"name": "registerRepo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "repos",
		"outputs": [
			{
				"internalType": "string",
				"name": "githubOwner",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "githubRepo",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "remainingBudget",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "repoId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issueId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "winnerUsername",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "difficulty",
				"type": "uint8"
			}
		],
		"name": "submitMergedUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "subscriptions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]