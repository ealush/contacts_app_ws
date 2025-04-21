"use client";

import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useCallback,
} from "react";
import styles from "./pager.module.css";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  contactId: number;
}

interface PagerProps {
  contactId: number;
}

export default function Pager({ contactId }: PagerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMessages = useCallback(
    async function fetchMessages() {
      setIsLoading(true);
      const response = await fetch(`/api/contacts/${contactId}/message`);

      const data: Message[] = await response.json();
      setMessages(data);
      setIsLoading(false);
    },
    [contactId]
  );

  useEffect(() => {
    if (contactId) {
      fetchMessages();
    } else {
      setMessages([]);
      setIsLoading(false);
    }
  }, [contactId, fetchMessages]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    const response = await fetch(`/api/contacts/${contactId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: contactId,
        content: newMessage,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    setNewMessage("");
    fetchMessages();
  };

  const formatTimestamp = (isoString: string): string => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <div className={styles.pagerContainer}>
      <h3>Pager</h3>

      <div className={styles.messageList}>
        {isLoading && <p>Loading messages...</p>}
        {!isLoading &&
          messages.map((msg) => (
            <div key={msg.id} className={styles.messageItem}>
              <p className={styles.messageContent}>{msg.content}</p>
              <span className={styles.messageTimestamp}>
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
          ))}
      </div>
      <form onSubmit={handleSendMessage} className={styles.messageForm}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className={styles.messageInput}
          aria-label="New message input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={!newMessage.trim() || isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
