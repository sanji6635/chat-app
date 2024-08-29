import {useRef,useEffect} from "react";
import useListenMessages from "../../hooks/useListenMessages";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const {messages,loading}=useGetMessages();
	useListenMessages();
	const messagesEndRef = useRef(); // Reference to the end of the messages container

	// Function to scroll to the bottom
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	// Scroll to the bottom whenever messages change
	useEffect(() => {
		if (!loading) {
			scrollToBottom();
		}
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length > 0 && messages.map((message)=>(
				<Message key={message._id} _message={message}  />)
			)  }

			{loading && [...Array(3)].map((_,idx)=><MessageSkeleton key={idx} /> )    }

			{!loading && messages.length === 0 && (
				<p className="text-center" >Send a message to start Conversation</p>
			) }

			<div ref={messagesEndRef} /> {/* Dummy div to scroll into view */}
		</div>
	);
};
export default Messages;


