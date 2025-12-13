"use client";

import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useCallback,
} from "react";
import styles from "./pager.module.css";

import clsx from "clsx";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  contactId: number;
}

type Messages = Message[];

interface PagerProps {
  contactId: number;
}

export default function Pager({ contactId }: PagerProps) {
  const [messages, setMessages] = useState<Messages>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMessages = useCallback(
    async function fetchMessages() {
      setIsLoading(true);
      const response = await fetch(`/api/contacts/${contactId}/message`);

      const data: Messages = await response.json();
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
    setInputValue(event.target.value);
  };

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const response = await fetch(`/api/contacts/${contactId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: contactId,
        content: inputValue,
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

    setInputValue("");
    fetchMessages();
  };

  return (
    <div className={styles.pagerContainer}>
      <h3>📟 Pager</h3>

      <div className={styles.messageList}>
        {messages.map((msg) => (
          <MessageItem key={msg.id} msg={msg} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className={styles.messageForm}>
        <input type="hidden" name="id" value={contactId} />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className={styles.messageInput}
          aria-label="New message input"
          disabled={isLoading}
          name="content"
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={!inputValue.trim() || isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

function MessageItem({ msg }: { msg: Message }) {
  const formatTimestamp = (isoString: string): string => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <div className={clsx(styles.messageItem)}>
      <p className={styles.messageContent}>{msg.content}</p>
      <span className={styles.messageTimestamp}>
        {formatTimestamp(msg.timestamp)}
      </span>
    </div>
  );
}
