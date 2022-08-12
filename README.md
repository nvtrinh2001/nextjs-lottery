# Next.js Lottery

Next.js Lottery is a frontend application for the Smart Contract Lottery project. This project allows players to enter the raffle, and the winner, which will be chosen randomly, will get all the prize.

# Quick Overview

Using [Next.js Framework](https://nextjs.org/) to build the interface, along with [Tailwindcss](https://tailwindcss.com/).

[Moralis](https://docs.moralis.io/) is used to make developing websites easier for developers, and create more functionalities.

Introduction to [web3uikit](https://github.com/web3ui/web3uikit), a Web3 library with beautiful and lightweight UI components.

Hosting the application on [IPFS](https://ipfs.tech/) manually, then using [Fleek](fleek.co) to do it with the help of Filecoin.

# Getting Started

## Requirements

-   git
-   Node.js
-   yarn

## Quick Start

```
git clone git@github.com:nvtrinh2001/nextjs-lottery.git
cd nextjs-lottery
yarn
yarn dev
```

# Usage

**1. Run your local blockchain of the Smart Contract Lottery code**

Open a different terminal:

```
git clone git@github.com:nvtrinh2001/hardhat-lottery.git
cd hardhat-lottery
yarn
yarn hardhat node
```

You can see more of the code in [this repository](https://github.com/nvtrinh2001/hardhat-lottery).

**2. Add your local hardhat network to your Metamask**

-   Get the RPC_URL of your hardhat network (shown in the terminal)
-   Go to your wallet and create a new network:
    -   name: hardhat-localhost
    -   RPC_URL: RPC_URL
    -   chain ID: 31337
    -   currency symbol: ETH
-   Import one of the accounts that hardhat gives you (shown in the terminal)

**3. Run the frontend application**

Open the `nextjs-lottery` terminal:

```
yarn dev
```

Your application will run on:

```
localhost:3000
```

# Deploy to IPFS

**1. Build your static code**

```
yarn build
```

**2. Export your code**

```
yarn next export
```

**3. Deploy to IPFS**

Make sure you have IPFS extension. See several options that IPFS provides [here](https://ipfs.tech/)

Import _out_ folder into IPFS and pin it

Copy the CID of the folder

Your application will run on:

`ipfs://YOUR_CID`

# Deploy using Fleek

[Fleek](fleek.co) is an easy tool to host your decentralized website. Go to its website and do as the instructions.
