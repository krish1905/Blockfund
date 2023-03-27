pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        mapping(address => uint256) donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint256[]) public donators;
    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline > block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.amountCollected += amount;
        campaign.donations[msg.sender] += amount;
        donators[msg.sender].push(_id);

        payable(campaign.owner).transfer(amount);
    }

    function getDonations(address _donator) view public returns (uint256[]) {
        return donators[_donator];
    }

    function getCampaign(uint256 _id) view public returns (Campaign memory) {
        return campaigns[_id];
    }
}
