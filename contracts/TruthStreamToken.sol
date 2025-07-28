// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TruthStreamToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    uint256 public constant VERIFICATION_REWARD = 50 * 10**18; // 50 TST per verification
    uint256 public constant CHALLENGE_REWARD_BASE = 100 * 10**18; // Base challenge reward
    
    mapping(address => bool) public verifiers;
    mapping(address => uint256) public lastRewardTime;
    mapping(bytes32 => bool) public usedProofs;
    
    event RewardDistributed(address indexed user, uint256 amount, string reason);
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    
    modifier onlyVerifier() {
        require(verifiers[msg.sender] || msg.sender == owner(), "Not authorized verifier");
        _;
    }
    
    constructor() ERC20("TruthStream Token", "TST") {
        _mint(msg.sender, INITIAL_SUPPLY);
        verifiers[msg.sender] = true;
    }
    
    function addVerifier(address verifier) public onlyOwner {
        verifiers[verifier] = true;
        emit VerifierAdded(verifier);
    }
    
    function removeVerifier(address verifier) public onlyOwner {
        verifiers[verifier] = false;
        emit VerifierRemoved(verifier);
    }
    
    function rewardVerification(
        address user,
        bytes32 proofHash,
        uint256 trustScore
    ) public onlyVerifier {
        require(!usedProofs[proofHash], "Proof already used");
        require(block.timestamp >= lastRewardTime[user] + 1 hours, "Reward cooldown active");
        
        usedProofs[proofHash] = true;
        lastRewardTime[user] = block.timestamp;
        
        // Calculate reward based on trust score
        uint256 reward = VERIFICATION_REWARD;
        if (trustScore >= 90) {
            reward = reward * 150 / 100; // 50% bonus for high trust
        } else if (trustScore >= 70) {
            reward = reward * 125 / 100; // 25% bonus for good trust
        }
        
        _mint(user, reward);
        emit RewardDistributed(user, reward, "Experience verification");
    }
    
    function rewardChallenge(
        address user,
        uint256 challengeId,
        uint256 difficulty
    ) public onlyVerifier {
        uint256 reward = CHALLENGE_REWARD_BASE;
        
        // Adjust reward based on difficulty
        if (difficulty == 3) { // Hard
            reward = reward * 200 / 100;
        } else if (difficulty == 2) { // Medium
            reward = reward * 150 / 100;
        }
        // Easy remains at base reward
        
        _mint(user, reward);
        emit RewardDistributed(user, reward, "Challenge completion");
    }
    
    function rewardReferral(address referrer, address referred) public onlyVerifier {
        uint256 referrerReward = 25 * 10**18; // 25 TST
        uint256 referredReward = 10 * 10**18; // 10 TST
        
        _mint(referrer, referrerReward);
        _mint(referred, referredReward);
        
        emit RewardDistributed(referrer, referrerReward, "Referral bonus");
        emit RewardDistributed(referred, referredReward, "Welcome bonus");
    }
    
    function burnTokens(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    function emergencyWithdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
}