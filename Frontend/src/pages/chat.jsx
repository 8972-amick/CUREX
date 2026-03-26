import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import api, { BASE_URL } from "../services/api";
import { toast } from "react-toastify";
import axios from "axios";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedOtherId, setSelectedOtherId] = useState("");

  const socketRef = useRef(null);
  const activeChatRef = useRef(null);
  const messagesEndRef = useRef(null);

  const userId = useMemo(() => Number(localStorage.getItem("userId")), []);
  const userName = useMemo(() => localStorage.getItem("userName"), []);
  const userRole = useMemo(() => localStorage.getItem("role"), []);

  activeChatRef.current = activeChat;

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
      if (!activeChatRef.current || message.chatId !== activeChatRef.current.id) {
        return;
      }
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    fetchChats();

    api
      .get("/api/appointments/doctors")
      .then((res) => setDoctors(res.data || []))
      .catch(() => setDoctors([]));

    if (userRole === "DOCTOR") {
      api
        .get("/api/appointments/patients")
        .then((res) => setPatients(res.data || []))
        .catch(() => setPatients([]));
    }

    return () => {
      socketRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userRole]);

  const backendUrl = BASE_URL; // Use BASE_URL from api service

  useEffect(() => {
    if (!activeChat || !socketRef.current) return;
    socketRef.current.emit("joinChat", activeChat.id);
    setMessages(activeChat.messages ?? []);
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchChats = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const resp = await axios.get(`${backendUrl}/api/chat/user/${userId}`);
      if (resp.data.success) {
        const sorted = resp.data.chats.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
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

  const startChat = async () => {
    if (!userId) return;
    const otherId = Number(selectedOtherId);
    const list = userRole === "DOCTOR" ? patients : doctors;
    if (!otherId || !list.find((u) => u.id === otherId)) {
      toast.warning(
        userRole === "DOCTOR" ? "Please select a patient" : "Please select a doctor"
      );
      return;
    }

    try {
      const resp = await axios.post(`${backendUrl}/api/chat/create`, {
        userIds: [userId, otherId],
        name: null,
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

        setSelectedOtherId("");
        toast.success("Chat started");
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

    setMessages((prev) => [
      ...prev,
      {
        ...payload,
        createdAt: new Date().toISOString(),
        sender: { id: userId, name: userName || "You" },
      },
    ]);
    setNewMessage("");
  };

  const selectChat = async (chat) => {
    setActiveChat(chat);
    setMessages(chat.messages?.slice().reverse() ?? []);

    if (socketRef.current) {
      socketRef.current.emit("joinChat", chat.id);
    }

    try {
      const resp = await axios.get(
        `${backendUrl}/api/chat/${chat.id}/messages`
      );
      if (resp.data.success) {
        setMessages(resp.data.messages);
      }
    } catch (error) {
      console.error("fetch messages error", error);
    }
  };

  const getOtherUser = (chat) => {
    const other = chat?.users
      ?.map((u) => u.user)
      .find((u) => u.id !== userId);
    return other;
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-slate-600 dark:text-gray-300 text-lg">
            Please log in to access the consultation chat.
          </p>
        </div>
      </div>
    );
  }

  const otherList = userRole === "DOCTOR" ? patients : doctors;
  const otherLabel = userRole === "DOCTOR" ? "patient" : "doctor";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto h-screen flex flex-col lg:flex-row">
        {/* Sidebar - conversations */}
        <aside className="w-full lg:w-80 shrink-0 bg-white dark:bg-slate-800 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-slate-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white text-lg shadow-lg">
                💬
              </div>
              <div>
                <h1 className="font-bold text-gray-800 dark:text-white">Consultation Chat</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userRole === "DOCTOR" ? "Your patients" : "Message your doctor"}
                </p>
              </div>
            </div>
          </div>

          {otherList.length > 0 && (
            <div className="p-3 border-b border-gray-200 dark:border-slate-700">
              <div className="flex gap-2">
                <select
                  value={selectedOtherId}
                  onChange={(e) => setSelectedOtherId(e.target.value)}
                  className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                  <option value="">Select {otherLabel}...</option>
                  {otherList.map((u) => (
                    <option key={u.id} value={u.id}>
                      {userRole === "DOCTOR" ? u.name : `Dr. ${u.name}`}
                    </option>
                  ))}
                </select>
                <button
                  onClick={startChat}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shrink-0"
                >
                  Start
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-2">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
              </div>
            ) : chats.length === 0 ? (
              <div className="text-center py-12 px-4">
                <p className="text-slate-500 text-sm">
                  No conversations yet.
                  <br />
                  {otherList.length > 0
                    ? `Select a ${otherLabel} above to start.`
                    : "Connect with a doctor to get started."}
                </p>
              </div>
            ) : (
              <ul className="space-y-1">
                {chats.map((chat) => {
                  const other = getOtherUser(chat);
                  const isActive = activeChat?.id === chat.id;
                  const lastMsg = chat.messages?.[0]?.text;

                  return (
                    <li
                      key={chat.id}
                      onClick={() => selectChat(chat)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700"
                          : "hover:bg-gray-50 dark:hover:bg-slate-700 border border-transparent"
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                          userRole === "DOCTOR"
                            ? "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400"
                            : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {userRole === "DOCTOR" ? "👤" : "🩺"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 dark:text-white truncate">
                          {userRole === "DOCTOR"
                            ? other?.name || "Patient"
                            : `Dr. ${other?.name || "Doctor"}`}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {lastMsg || "No messages yet"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {/* Main chat area */}
        <section className="flex-1 flex flex-col bg-white dark:bg-slate-800 min-h-0">
          {activeChat ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    userRole === "DOCTOR"
                      ? "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400"
                      : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {userRole === "DOCTOR" ? "👤" : "🩺"}
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 dark:text-white">
                    {userRole === "DOCTOR"
                      ? getOtherUser(activeChat)?.name || "Patient"
                      : `Dr. ${getOtherUser(activeChat)?.name || "Doctor"}`}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userRole === "DOCTOR"
                      ? "Patient • Secure consultation"
                      : "Verified Doctor • Secure consultation"}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No messages yet. Say hello to start the conversation.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      All messages are logged for medical reference.
                    </p>
                  </div>
                )}
                {messages.map((msg, idx) => {
                  const fromMe =
                    msg.senderId === userId || msg.sender?.id === userId;

                  return (
                    <div
                      key={msg.id || `${idx}-${msg.createdAt}`}
                      className={`flex ${fromMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex flex-col max-w-[75%] lg:max-w-[60%] ${
                          fromMe ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`px-4 py-2.5 rounded-2xl ${
                            fromMe
                              ? "bg-blue-600 text-white rounded-br-md"
                              : "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white border border-gray-200 dark:border-slate-600 rounded-bl-md"
                          }`}
                        >
                          {!fromMe && (
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              {msg.sender?.name || "Participant"}
                            </p>
                          )}
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {msg.text}
                          </p>
                          <p
                            className={`text-[10px] mt-1 ${
                              fromMe ? "text-blue-200" : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shrink-0"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-sm">
                <div className="text-7xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Choose a chat from the sidebar or start a new consultation with
                  your {otherLabel}.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Chat;
