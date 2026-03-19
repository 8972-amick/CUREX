import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:3000";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const socketRef = useRef(null);

  const userId = useMemo(() => Number(localStorage.getItem("userId")), []);
  const userName = useMemo(() => localStorage.getItem("userName"), []);

  useEffect(() => {
    if (!userId) {
      toast.warning("Please log in to use chat");
      return;
    }

    socketRef.current = io(backendUrl, { transports: ["websocket"] });

    socketRef.current.on("connect", () => {
      console.log("Connected to chat socket", socketRef.current.id);
    });

    socketRef.current.on("receiveMessage", (message) => {
      if (!activeChat || message.chatId !== activeChat.id) {
        return;
      }
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    fetchChats();

    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (!activeChat || !socketRef.current) return;
    socketRef.current.emit("joinChat", activeChat.id);
    setMessages(activeChat.messages ?? []);
  }, [activeChat]);

  const fetchChats = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const resp = await axios.get(`${backendUrl}/api/chat/user/${userId}`);
      if (resp.data.success) {
        const sorted = resp.data.chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setChats(sorted);
        if (sorted.length) {
          setActiveChat(sorted[0]);
          setMessages(sorted[0].messages?.slice().reverse() ?? []);
        }
      }
    } catch (error) {
      console.error("fetchChats error", error);
      toast.error("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  const createSampleChat = async () => {
    if (!userId) return;
    const otherUserId = userId === 1 ? 2 : 1;

    try {
      const resp = await axios.post(`${backendUrl}/api/chat/create`, {
        userIds: [userId, otherUserId],
        name: "Doctor Chat",
      });

      if (resp.data.success) {
        const availableChat = resp.data.chat;
        setChats((prev) => {
          const existing = prev.find((c) => c.id === availableChat.id);
          if (existing) return prev;
          return [availableChat, ...prev];
        });
        setActiveChat(availableChat);
        setMessages(availableChat.messages ?? []);

        if (socketRef.current) {
          socketRef.current.emit("joinChat", availableChat.id);
        }

        toast.success("Chat initialized");
      }
    } catch (error) {
      console.error("create chat error", error);
      toast.error("Failed to create chat");
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    const payload = {
      chatId: activeChat.id,
      senderId: userId,
      text: newMessage.trim(),
    };

    socketRef.current.emit("sendMessage", payload);

    setMessages((prev) => [...prev, { ...payload, createdAt: new Date().toISOString(), sender: { id: userId, name: userName || "You" } }]);
    setNewMessage("");
  };

  const selectChat = async (chat) => {
    setActiveChat(chat);
    setMessages(chat.messages?.slice().reverse() ?? []);

    if (socketRef.current) {
      socketRef.current.emit("joinChat", chat.id);
    }

    try {
      const resp = await axios.get(`${backendUrl}/api/chat/${chat.id}/messages`);
      if (resp.data.success) {
        setMessages(resp.data.messages);
      }
    } catch (error) {
      console.error("fetch messages error", error);
    }
  };

  if (!userId) {
    return (
      <div className="text-center mt-16">
        <p className="text-gray-600">You must be logged in to access chat.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4">
        <aside className="lg:col-span-1 bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-3">Chats</h2>
          <button
            onClick={createSampleChat}
            className="mb-3 w-full bg-emerald-500 text-white py-2 rounded-lg"
          >
            Start doctor chat
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : chats.length === 0 ? (
            <p className="text-gray-500">No conversations yet.</p>
          ) : (
            <ul className="space-y-2">
              {chats.map((chatElement) => {
                const otherUsers = chatElement.users
                  .map((u) => u.user)
                  .filter((u) => u.id !== userId)
                  .map((u) => u.name)
                  .join(", ");

                return (
                  <li
                    key={chatElement.id}
                    onClick={() => selectChat(chatElement)}
                    className={`cursor-pointer p-2 rounded-lg ${activeChat?.id === chatElement.id ? "bg-emerald-100" : "bg-gray-50"}`}
                  >
                    <p className="font-medium">{chatElement.name || otherUsers || "Chat"}</p>
                    <p className="text-xs text-gray-500">
                      {chatElement.messages?.[0]?.text ?? "No messages yet"}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        <section className="lg:col-span-3 bg-white rounded-xl shadow p-4 flex flex-col">
          <div className="border-b pb-3 mb-3">
            <h2 className="text-xl font-semibold">
              {activeChat ? activeChat.name || "Conversation" : "Select a chat"}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 px-2">
            {activeChat && messages.length === 0 && <p className="text-center text-gray-500">No messages yet. Say hello!</p>}
            {activeChat &&
              messages.map((msg, idx) => {
                const fromCurrent = msg.senderId === userId || msg.sender?.id === userId;
                return (
                  <div key={`${msg.id || idx}-${msg.createdAt}`} className={`flex ${fromCurrent ? "justify-end" : "justify-start"}`}>
                    <div className={`py-2 px-3 rounded-lg max-w-[70%] ${fromCurrent ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                      <p className="text-xs mb-1">{fromCurrent ? "You" : msg.sender?.name ?? "Participant"}</p>
                      <p>{msg.text}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2"
                placeholder="Type a message..."
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); sendMessage(); } }}
              />
              <button onClick={sendMessage} className="bg-emerald-500 text-white px-4 rounded-lg">
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chat;

