import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    
    // enableWeb3 is a function connecting metamask wallet
    // deactivateWeb3, isWeb3EnableLoading are also functions for metamask
    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis()

    // let isConnected = false; 
    // => when changing states, isConnected = true
    // => Ok solution but website will not re-render 
    // automatically to adapt the change
    // hook solves that problem

    useEffect(() => {
        if (isWeb3Enabled) return

        // automatically connect after refreshing
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("metamask-connected")) {
                enableWeb3()
            }
        }

    }, [isWeb3Enabled])
    // if no dependency array => run everytime something is re-render!!
    // empty array => run once on load and no more (if strictmode is off)
    // if there's a variable in the array => run when that var is re-render

    // spot changing accounts, delete connected in localStorage when users disconnect account
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Changed to account ${account}`)
            if (account == null) {
                window.localStorage.removeItem("metamask-connected")
                deactivateWeb3()
                console.log("Null account found!")
            }
        })
    })

    return(<div>
        {
            account ? 
            <div className="">
                <button>Connected!</button>
                <p>Account: {account.slice(0, 6)}...{account.slice(account.length - 4)}</p>
            </div>
            : <button onClick={async () => {
                await enableWeb3()

                // if connected => no need to hit button
                // by using localStorage
                if (typeof window !== "undefined") {
                    // add key and value into the application storage
                    window.localStorage.setItem("metamask-connected", "metamask-injected")
                }
            }}
            // check if metamask is poping up
            disabled={isWeb3EnableLoading}
            >
                Connect</button>
        }
    </div>)
}