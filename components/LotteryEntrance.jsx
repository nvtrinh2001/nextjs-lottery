// Have a function to enter the lottery
import { useWeb3Contract } from "react-moralis"
import {abi, contractAddress} from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import {ethers} from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    // useMoralis() knows about chainId variable is because 
    // all information about Metamask is sent to Moralis Provider

    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis() // return chainId in hex
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    // use useState to show value of variable after being re-rendering
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    // runContractFunction() can both send transactions and read states
    const {runContractFunction: enterRaffle, isLoading, isFetching} = useWeb3Contract({
        abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee
    })

    const {runContractFunction: getEntranceFee} = useWeb3Contract({
        abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({
        abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const {runContractFunction: getRecentWinner} = useWeb3Contract({
        abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numOfPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()

        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numOfPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    // getEntranceFee, getNumOfPlayers, getRecentWinner during loading
    useEffect(() => {
        if (isWeb3Enabled) {
            // call function getEntranceFee()
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Completed!",
            title: "Tx Notification",
            position: "topR",
            icon:"bell"
        })
    }

    return (
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
            {raffleAddress ? (
                <>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await enterRaffle({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Enter Raffle"
                        )}
                    </button>
                    <p>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</p>
                    <p>Number of players: {numPlayers}</p>
                    <p>Recent winner: {recentWinner}</p>
                </>
            ) : (
                <div className="">No Raffle Address detected!</div>
            )}
        </div>
    )
}