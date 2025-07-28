// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TruthStreamNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    struct Experience {
        string experienceType;
        string title;
        string description;
        string location;
        uint256 timestamp;
        bool verified;
        uint256 trustScore;
        bytes32 proofHash;
    }
    
    mapping(uint256 => Experience) public experiences;
    mapping(address => uint256[]) public userExperiences;
    mapping(address => uint256) public userTrustScores;
    
    event ExperienceNFTMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string experienceType,
        string title,
        bool verified
    );
    
    event TrustScoreUpdated(
        address indexed user,
        uint256 oldScore,
        uint256 newScore
    );
    
    constructor() ERC721("TruthStream Experience", "TSE") {}
    
    function mintExperienceNFT(
        address to,
        string memory experienceType,
        string memory title,
        string memory description,
        string memory location,
        string memory tokenURI,
        bool verified,
        uint256 trustScore,
        bytes32 proofHash
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        experiences[tokenId] = Experience({
            experienceType: experienceType,
            title: title,
            description: description,
            location: location,
            timestamp: block.timestamp,
            verified: verified,
            trustScore: trustScore,
            proofHash: proofHash
        });
        
        userExperiences[to].push(tokenId);
        
        // Update user trust score
        _updateUserTrustScore(to);
        
        emit ExperienceNFTMinted(tokenId, to, experienceType, title, verified);
        
        return tokenId;
    }
    
    function _updateUserTrustScore(address user) internal {
        uint256[] memory userTokens = userExperiences[user];
        uint256 totalScore = 0;
        uint256 verifiedCount = 0;
        
        for (uint256 i = 0; i < userTokens.length; i++) {
            Experience memory exp = experiences[userTokens[i]];
            if (exp.verified) {
                totalScore += exp.trustScore;
                verifiedCount++;
            }
        }
        
        uint256 oldScore = userTrustScores[user];
        uint256 newScore = verifiedCount > 0 ? totalScore / verifiedCount : 0;
        
        userTrustScores[user] = newScore;
        
        emit TrustScoreUpdated(user, oldScore, newScore);
    }
    
    function getUserExperiences(address user) public view returns (uint256[] memory) {
        return userExperiences[user];
    }
    
    function getUserTrustScore(address user) public view returns (uint256) {
        return userTrustScores[user];
    }
    
    function getExperience(uint256 tokenId) public view returns (Experience memory) {
        require(_exists(tokenId), "Experience does not exist");
        return experiences[tokenId];
    }
    
    function verifyExperience(uint256 tokenId, bytes32 proofHash) public onlyOwner {
        require(_exists(tokenId), "Experience does not exist");
        experiences[tokenId].verified = true;
        experiences[tokenId].proofHash = proofHash;
        
        address owner = ownerOf(tokenId);
        _updateUserTrustScore(owner);
    }
    
    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}