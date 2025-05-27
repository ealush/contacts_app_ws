"use client";

import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useActionState,
  useTransition,
} from "react";
import styles from "./pager.module.css";
import sendMessageAction from "../actions/sendMessageAction";
import getMessagesAction from "../actions/getMessagesAction";

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
  const [, action, isPending] = useActionState(sendMessage, null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const messages = await getMessagesAction(contactId);

      setMessages(
        messages.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp).toISOString(),
        }))
      );
    });
  }, [contactId]);

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
      <form action={action} className={styles.messageForm}>
        <input type="hidden" name="id" value={contactId} />
        <input
          type="text"
          name="content"
          placeholder="Type your message..."
          className={styles.messageInput}
          aria-label="New message input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={isLoading || isPending}
        >
          Send
        </button>
      </form>
    </div>
  );

  async function sendMessage(_: unknown, formData: FormData) {
    const message = await sendMessageAction(formData);

    setMessages((messages) => [message, ...messages] as Message[]);
  }
}
