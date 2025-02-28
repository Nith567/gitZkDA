// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@reclaimprotocol/verifier-solidity-sdk/contracts/Reclaim.sol";
import "@reclaimprotocol/verifier-solidity-sdk/contracts/Addresses.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract zkGitDA {
    using SafeERC20 for IERC20;

    address public immutable Agent = 0x2D62332066e2735DEbEaf71AFE343236C9Ee7a1e;
    IERC20 public immutable USDC = IERC20(0xD0f738050ccbBB66CD8098378b09fd62075D43b8);
    address public reclaimAddress;

    struct Repo {
        string githubOwner; 
        string githubRepo;
        uint256 remainingBudget;
        uint256[3] rewards; // Rewards for (easy, medium, hard)
    }
    mapping(string => uint256) public subscriptions; // repoId -> expiry timestamp
    mapping(string => Repo) public repos; // repoId -> Repo
    mapping(string => mapping(string => string)) public mergedWinners; // repoId -> issueId -> winnerUsername
    mapping(string => mapping(string => uint8)) public issueLabels; // repoId -> issueId -> difficulty (0,1,2)
    mapping(string => mapping(string => mapping(string => bool))) public hasClaimed; // repoId -> issueId -> username -> claimed

    event RepoRegistered(string repoId, string owner, string repo);
    event FundsDeposited(string repoId, uint256 amount);
    event WinnerAssigned(string repoId, string issueId, string winner, uint8 difficulty);
    event RewardClaimed(string repoId, string issueId, uint256 amount);
    event SubscriptionPaid(string orgId, uint256 expiry);
    modifier onlyAgent() {
        require(msg.sender == Agent, "Only owner can call this");
        _;
    }
    
    modifier onlySubscribed(string memory orgId) {
    require(subscriptions[orgId] >= block.timestamp, "Subscription expired");
    _;
     }
    constructor() {
        reclaimAddress = Addresses.MANTA;
    }

    function paySubscription(string memory orgId, bool yearly) external {
    uint256 amount = yearly ? 200 * 1e6 : 20 * 1e6; 
    USDC.safeTransferFrom(msg.sender, address(this), amount);
    uint256 duration = yearly ? 365 days : 30 days;
    if (subscriptions[orgId] < block.timestamp) {
        subscriptions[orgId] = block.timestamp + duration;
    } else {
        subscriptions[orgId] += duration;
    }
    emit SubscriptionPaid(orgId, subscriptions[orgId]);
    }


    function registerRepo(
        string memory repoId,
        string memory githubOwner,     
        string memory githubRepo,
        uint256[] memory rewards
    ) external  onlySubscribed(repoId) {
        require(bytes(repos[repoId].githubOwner).length == 0, "Repo already exists");
        require(rewards.length == 3, "Must provide rewards for all difficulty levels (easy, medium, hard)");

        repos[repoId] = Repo({
            githubOwner: githubOwner,
            githubRepo: githubRepo,
            remainingBudget: 0,
            rewards: [rewards[0], rewards[1], rewards[2]]
        });

        emit RepoRegistered(repoId, githubOwner, githubRepo);
    }

    function depositFunds(string memory repoId, uint256 amount) external  {
        require(bytes(repos[repoId].githubOwner).length > 0, "Repo not found");
        USDC.safeTransferFrom(msg.sender, address(this), amount);
        repos[repoId].remainingBudget += amount;
        emit FundsDeposited(repoId, amount);
    }

    function submitMergedUser(
        string memory repoId,
        string memory issueId,
        string memory winnerUsername,
        uint8 difficulty
    ) external onlyAgent onlySubscribed(repoId)  {
        require(bytes(repos[repoId].githubOwner).length > 0, "Repo not found");
        require(difficulty < 3, "Invalid difficulty"); // 0 = easy, 1 = medium, 2 = hard

        issueLabels[repoId][issueId] = difficulty;
        mergedWinners[repoId][issueId] = winnerUsername;
        emit WinnerAssigned(repoId, issueId, winnerUsername, difficulty);
    }

    function claimReward(
        string memory repoId,
        string memory issueId,
        Reclaim.Proof memory proof
    ) external {
        Reclaim(reclaimAddress).verifyProof(proof);
        string memory context = proof.claimInfo.context;
        string memory username = extractUsername(context);

        require(
            keccak256(abi.encodePacked(mergedWinners[repoId][issueId])) == keccak256(abi.encodePacked(username)),
            "Username mismatch"
        );
        require(!hasClaimed[repoId][issueId][username], "Reward already claimed");

        uint8 difficulty = issueLabels[repoId][issueId];
        uint256 rewardAmount = repos[repoId].rewards[difficulty]* 1e6; // ✅ Correct reward lookup

        require(rewardAmount > 0, "Invalid reward");
        require(repos[repoId].remainingBudget >= rewardAmount, "Insufficient funds");

        repos[repoId].remainingBudget -= rewardAmount;
        hasClaimed[repoId][issueId][username] = true;
        USDC.safeTransfer(msg.sender, rewardAmount);

        emit RewardClaimed(repoId, issueId, rewardAmount);
    }

    function extractUsername(string memory json) internal pure returns (string memory) {
        bytes memory jsonBytes = bytes(json);
        bytes memory key = bytes("\"username\":\"");
        uint256 keyLength = key.length;
        for (uint256 i = 0; i < jsonBytes.length - keyLength; i++) {
            bool matchFound = true;
            for (uint256 j = 0; j < keyLength; j++) {
                if (jsonBytes[i + j] != key[j]) {
                    matchFound = false;
                    break;
                }
            }
            if (matchFound) {
                uint256 start = i + keyLength;
                uint256 end = start;
                while (end < jsonBytes.length && jsonBytes[end] != '"') {
                    end++;
                }
                bytes memory usernameBytes = new bytes(end - start);
                for (uint256 k = 0; k < usernameBytes.length; k++) {
                    usernameBytes[k] = jsonBytes[start + k];
                }
                return string(usernameBytes);
            }
        }
        return "";
    }
}
