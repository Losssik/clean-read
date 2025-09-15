import { useState } from "react";

export default function Test() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage() {
    const res = await fetch("http://localhost:4000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
  }

  return (
    <div>
      <h1>Chat z AI</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Wyślij</button>
      <div>
        <strong>Odpowiedź AI:</strong> {response}
      </div>
    </div>
  );
}
