import React, { useState } from 'react';
import { useAccount, useAccountEffect, useDisconnect, useReadContracts, useSignMessage, useWriteContract, useWaitForTransactionReceipt, useConfig, useGasPrice } from 'wagmi';
import Environment from '../utils/Environment';
import stakeABI from '../utils/stakeABI.json';
import { waitForTransactionReceipt } from "@wagmi/core";

const Staking = () => {

    const { address } = useAccount();
    const { data: hash, writeContract, isPending, isSuccess, isError, error } = useWriteContract();
    const config = useConfig();
    const gas = useGasPrice()

    const [stakeAmount, setStakeAmount] = useState('');
    const [loader, setLoader] = useState(false);

    console.log(isPending, isSuccess, isError, error, "resss");


    const stakeContract = {
        address: Environment?.stakingContract,
        abi: stakeABI,
    }

    const handleTransactionSubmitted = async (txHash) => {
        console.log(txHash);
        setLoader(true);
        const transactionReceipt = await waitForTransactionReceipt(config, {
            hash: txHash,
        });
        setLoader(false);
        // at this point the tx was mined
        if (transactionReceipt.status === "success") {
            // execute your logic here
            setStakeAmount();
            // refetch();
            // window.alert('transaction successfully committed')
        }
    };
    async function stakeFun() {
        // if (!address || !stakeAmount) {
        //     window.alert('Please connect wallet and enter amount')
        //     return
        // }

        writeContract({
            ...stakeContract,
            functionName: 'stake',
            args: [
                stakeAmount,
            ],
        },
            {
                onSuccess(hash) { handleTransactionSubmitted(hash) },
            }
        )

    }


    return (
        <div>
            Staking

            <div className="write">
                {/* <h5>Write contracts</h5> */}
                <input
                    className='button'
                    onChange={(e) => setStakeAmount(e.target.value)}
                    type='number'
                    placeholder="Enter approve amount"
                />
                <button className='button' onClick={stakeFun}>{(isPending || loader) ? 'Loading...' : 'Approve'}</button>
            </div>
        </div>
    )
}

export default Staking
