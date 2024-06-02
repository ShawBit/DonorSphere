'use client';
import { VotingBase } from '@/abis/VotingBase';
import { VotingFactory } from '@/abis/VotingFactory';
import { VotingFactoryAddress } from '@/constants';

import { Button, Input, Radio, RadioGroup } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';

export default function MemberManager() {
  const [memberAddress, setMeberAddress] = useState<`0x${string}`>('0xcc0030860577CB392C2104E1AA3EccD17181588C');
  const [contractAddress, setContractAddress] = useState<`0x${string}`>('0xaF7f5a00C1E57f8Db7111272FAe001E3081c9934');
  const [addresses, setAddresses] = useState<string[]>(['0xaF7f5a00C1E57f8Db7111272FAe001E3081c9934']);

  const { writeContractAsync } = useWriteContract();

  const results = useReadContract({
    abi: VotingFactory,
    address: VotingFactoryAddress,
    functionName: 'getAllCampaigns',
  });

  useEffect(() => {
    if (results.data && results.isFetched && addresses.length) {
      setAddresses(results.data as `0x${string}`[]);
    }
  }, [results.data, results.isFetched, addresses.length]);

  const addMember = () => {
    writeContractAsync({
      abi: VotingBase,
      address: contractAddress,
      functionName: 'addMember',
      args: [memberAddress],
    });
  };
  const removeMember = () => {
    writeContractAsync({
      abi: VotingBase,
      address: contractAddress,
      functionName: 'removeMember',
      args: [memberAddress],
    });
  };
  return (
    <div className="flex flex-col gap-4 border-1 p-5 rounded-xl">
      <RadioGroup
        label="Please select contract address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value as `0x${string}`)}
      >
        {addresses && addresses.length > 0 ? (
          addresses.map((value) => (
            <Radio key={value} value={value}>
              {value}
            </Radio>
          ))
        ) : (
          <p>No items available</p>
        )}
      </RadioGroup>
      <Input
        label="address"
        value={memberAddress}
        labelPlacement="outside"
        placeholder="Please enter member address"
        isRequired
        onChange={(e) => {
          setMeberAddress(e.target.value as `0x${string}`);
        }}
      />
      <div className="flex gap-4">
        <Button onClick={addMember}>Add Member</Button>
        <Button onClick={removeMember}>Remove Member</Button>
      </div>
    </div>
  );
}
