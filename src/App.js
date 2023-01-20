import './App.css';
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import Logout from './components/Logout';



const App = () => {
    if (!localStorage.getItem('username')) {
        return <LoginForm />
    }

    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Random Chat App
                </div>
                <div className='logout-tab' onClick={Logout}>
                    Logout
                </div>
            </div>
            <ChatEngine
                height="93vh"
                projectID="3722fc98-d346-4be0-ab3a-d84ff323b610"
                userName={localStorage.getItem('username')}
                userSecret={localStorage.getItem('password')}
                renderChatFeed={(chatProps) => <ChatFeed {...chatProps} />}
            />
        </div>
    );
}

export default App;