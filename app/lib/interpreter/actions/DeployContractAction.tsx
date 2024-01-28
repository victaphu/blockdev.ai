import { ReactElement, useEffect, useState } from "react";
import InterpretedAction from "./IntepretedAction";
import { Button } from "@/app/components/button";
import { ChatHistoryType } from "@/app/components/chatbot/ChatHistory";
import { getContract, getErc20, useContract, useSDK } from "@thirdweb-dev/react";
import LoadingSpinner from "@/app/components/chatbot/LoadingSpinner";
import { FaSquareCheck } from "react-icons/fa6";
import { FaSquareXmark } from "react-icons/fa6";

const Action = ({ request }: { request: ChatHistoryType }) => {
  const sdk = useSDK();
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');

  const [success, setSuccess] = useState(false);

  const {contract, isLoading} = useContract(address, 'token');

  console.log(contract);

  const mintToken = async () => {
    if (!request.arguments) {
      return;
    }
    setError("");
    setDeploying(true);
    try {
      const address = await sdk?.deployer.deployToken({
        name: request.arguments.name,
        symbol: request.arguments.symbol,
      });

      if (!address) {
        setError("Failed to deploy contract");
        return;
      }

      setAddress(address);

    }
    catch (e) {
      console.error(e);
      setError(e + "");
    }
    finally {
      setDeploying(false);
    }
  }

  useEffect(() => {
    if (!contract || isLoading) {
      return;
    }
    if (!request.arguments) {
      return;
    }

    console.log(contract);
    contract.mint(request.arguments.totalSupply).then((value) => {
      console.log('success!');
      console.log(value);
      setSuccess(true);
    });

  }, [contract])

  if (error !== '') {
    return <div className="text-red-600">
      <div className="flex flex-col"><FaSquareXmark /><div className="text-ellipsis">An error occurred while minting your token. Error was {error}. You may not have enough tokens. Visit <a href="https://www.bnbchain.org/en/testnet-faucet" target="blank" referrerPolicy="no-referrer">The BNB Faucet</a> for some test tokens.</div></div>
      <Button onClick={mintToken}>Retry</Button>
    </div>
  }

  if (success) {
    return <div>
      <FaSquareCheck />Successfully minted your new contract. Check it out at <a href={`https://testnet.bscscan.com/address/${address}`} target="blank" referrerPolicy="no-referrer">{address}</a>
    </div>
  }

  if (address !== "") {
    return <div>
      <div className="w-8"><LoadingSpinner/></div>Successfully deployed the contract, we are now minting some tokens into your account. You'll be asked to sign another transaction. Check it out your new token at <a href={`https://testnet.bscscan.com/address/${address}`} target="blank" referrerPolicy="no-referrer">{address}</a>
    </div>
  }

  if (deploying) {
    return <div>
      <div className="w-8"><LoadingSpinner/></div> Your contract is being deployed, please approve any transactions that pop up as we deploy and mint some tokens
    </div>
  }

  return <div>
    <Button disabled={deploying} onClick={mintToken}>Mint {request.arguments?.name} Token</Button>
  </div>
}

export class DeployContractAction implements InterpretedAction {

  render(request: ChatHistoryType): ReactElement {
    return <Action request={request} />
  }
}
