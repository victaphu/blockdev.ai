import { ReactElement } from "react";
import InterpretedAction from "./IntepretedAction";
import { Button } from "@/app/components/button";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ChatHistoryType } from "@/app/components/chatbot/ChatHistory";
// import { useAccount, useChainId, useConnect, useSwitchNetwork } from "wagmi";
// import { getAccount, connect, switchNetwork } from "@wagmi/core";
// import { InjectedConnector } from '@wagmi/core/connectors/injected'
// import { bsc, bscTestnet, mainnet } from 'wagmi/chains'

// const Action = () => {

//   const handleConnect = async () => {
//     // console.log('connect');
//     const result = await connect({
//       connector: new InjectedConnector({ chains: [bsc, bscTestnet, mainnet] })
//     })

//     // console.log(result);
//   }

//   const handleSwitchNetwork = async () => {
//     try {
//       const result = await switchNetwork({ chainId: bscTestnet.id });
//     }
//     catch (e: any) {
//       // console.log(e.code);
//       try {
//         await window.ethereum?.request({
//           method: "wallet_addEthereumChain",
//           params: [
//             {
//               chainId: '0x' + bscTestnet.id.toString(16),
//               chainName: bscTestnet.name,
//               rpcUrls: bscTestnet.rpcUrls.public.http,
//               nativeCurrency: {
//                 decimals: 18,
//                 name: 'tBNB',
//                 symbol: 'tBNB'
//               }
//             }
//           ]
//         })
//       }
//       catch (e) {

//       }
//     }
//   }

//   const { address, isConnecting, isDisconnected, isConnected } = useAccount();
//   const chainId = useChainId()

//   if (isConnecting) {
//     return <Button disabled>Connecting ...</Button>
//   }
//   if (chainId !== bscTestnet.id) {
//     return <Button onClick={handleSwitchNetwork}>Switch to BSC Testnet</Button>
//   }
//   if (isConnected) {
//     return <Button disabled>Connected: {address}</Button>
//   }
//   return <Button onClick={handleConnect}>Connect Wallet</Button>
// }

const Action = () => {
  return <div>
    <ConnectWallet className="bg-secondary text-white p-2 font-satoshi-regular"/>
  </div>
}

export class ConnectWalletAction implements InterpretedAction {

  render(request: ChatHistoryType): ReactElement {
    return <Action />
  }
}
