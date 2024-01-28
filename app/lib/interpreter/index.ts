import { InstructionType } from "../model/Instruction";
import InterpretedAction from "./actions/IntepretedAction";
import { ConnectWalletAction } from "./actions/ConnectWalletAction";
import { DeployContractAction } from "./actions/DeployContractAction";

export const supportedActions:{[key in InstructionType] : InterpretedAction | undefined} = {
  [InstructionType.CONNECT_WALLET]: new ConnectWalletAction(),
  [InstructionType.DEPLOY_CONTRACT]: new DeployContractAction(),
  [InstructionType.EXECUTE_TRANSACTION]: undefined
};
export default class Intepreter {
  static getAction(action: InstructionType): InterpretedAction | undefined {
    // console.log(action, supportedActions[action])
    return supportedActions[action];
  }
}