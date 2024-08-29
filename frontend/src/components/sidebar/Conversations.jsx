import useGetConverations from "../../hooks/useGetConverations";
import Conversation from "./Conversation";
import {getRandomEmoji} from "../../utils/emojis";

const Conversations = () => {
	const {loading,conversations}=useGetConverations();
	console.log(conversations)
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation,idx)=>(
				<Conversation 
				key={conversation._id} 
				conversation={conversation}  
				emoji={getRandomEmoji()} 
				lastIdx={idx === conversations.length - 1 }
				/>
			)
			)}
		</div>
	);
};
export default Conversations;