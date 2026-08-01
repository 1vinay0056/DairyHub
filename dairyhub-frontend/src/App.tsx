import AppRouter from "./routes/AppRouter";
import ChatBot from "./components/chatbot/Chatbot";

function App() {
  return (
    <>
      <AppRouter />
      <ChatBot />
    </>
  );
}

export default App;