// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library DataType {
    struct CampaignInfo {
        uint256 id; // 活动id
        string name; // 活动名称
        address beneficiary; // 受益人
        uint256 targetAmount; // 目标金额
        uint256 currentAmount; // 已筹集金额
        uint256 beginTime; // 捐款开始时间
        uint256 endTime; // 捐款结束时间
        address creator; // 活动发起人
        bool donationWithdrawn; // 捐款是否被提取

        uint256 createTime;  //项目发起时间
        uint256 voteCount;   //同意项目通过
        uint256 againstCount; //反对项目通过
        bool passed;          //检查项目是否通过

    }
}
