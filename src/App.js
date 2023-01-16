import { ChatEngine } from "react-chat-engine";
import './App.css';
import ChatFeed from "./components/ChatFeed";

const App = () => {
    return (
        <ChatEngine 
            height="100vh"
            projectID="3722fc98-d346-4be0-ab3a-d84ff323b610"
            userName="randomdude"
            userSecret="randompass"
            renderChatFeed={(chatProps) => <ChatFeed {...chatProps}/>}
        />
    );
}

export default App;