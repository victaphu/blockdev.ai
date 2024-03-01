import Intepreter from "@/app/lib/interpreter"
import { InstructionType } from "@/app/lib/model/Instruction"
import { ChatHistoryType } from "../chatbot/ChatHistory"

type ChatboxProps = {
  user: boolean,
  text: string,
  notice?: boolean
  instruction?: InstructionType,
  chat?: ChatHistoryType

}

export default function Chatbox(props: ChatboxProps) {
  const { user, notice, instruction, chat } = props;

  return <div className={"p-5 rounded-xl w-full max-w-5xl " + (props.user ? 'bg-white' : 'bg-secondary-content text-primary-content')}>
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-start">
        <div className={"my-1 w-4 h-4 rounded-full border-white border "  + (props.user ? 'bg-primary-content' : 'bg-secondary')}></div>
        <div>
          <div className="font-satoshi">{props.user ? 'You' : 'BlockDev'}</div>
          <div className="font-satoshi-regular text-xl">
            {props.text}
            {Intepreter.getAction(instruction!)?.render(chat!)}

          </div>
        </div>
      </div>
    </div>
  </div>
}