import './App.css';
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";

const App = () => {
    if (!localStorage.getItem('username')) {
        return <LoginForm/>
    }

    return (
        <ChatEngine
            height="100vh"
            projectID="3722fc98-d346-4be0-ab3a-d84ff323b610"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatProps) => <ChatFeed {...chatProps} />}
        />
    );
}

export default App;