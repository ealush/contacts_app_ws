"use client";

import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useCallback,
  useActionState,
} from "react";
import styles from "./pager.module.css";
import sendMessageAction from "../actions/sendMessageAction";

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
  const [, formAction, isPending] = useActionState(sendMessage, null);
  const [messages, setMessages] = useState<Message[]>([]);
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
      <form action={formAction} className={styles.messageForm}>
        <input type="hidden" name="id" value={contactId} />
        <input
          type="text"
          placeholder="Type your message..."
          className={styles.messageInput}
          aria-label="New message input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={isPending || isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );

  async function sendMessage(_: unknown, formData: FormData) {
    const message = await sendMessageAction(formData);

    setMessages((prevMessages) => [message, ...prevMessages]);
  }
}
