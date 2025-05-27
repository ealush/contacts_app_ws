"use client";

import React, {
  useState,
  useEffect,
  useActionState,
  useTransition,
  useOptimistic,
} from "react";
import styles from "./pager.module.css";
import sendMessageAction from "../actions/sendMessageAction";
import getMessagesAction from "../actions/getMessagesAction";
import clsx from "clsx";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  contactId: number;
  isOptimistic?: boolean;
}

interface PagerProps {
  contactId: number;
}

export default function Pager({ contactId }: PagerProps) {
  const [, action, isPending] = useActionState(sendMessage, null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, startTransition] = useTransition();
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (messages: Message[], optimisticMessage: Message) => {
      return [optimisticMessage, ...messages];
    }
  );

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
          optimisticMessages.slice(0, 5).map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                styles.messageItem,
                msg.isOptimistic && styles.optimistic
              )}
            >
              <p className={styles.messageContent}>{msg.content}</p>
              <span className={styles.messageTimestamp}>
                {msg.isOptimistic ? "just now" : formatTimestamp(msg.timestamp)}
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
    const content = formData.get("content") as string;
    const id = formData.get("id") as string;

    addOptimisticMessage({
      content,
      id: Math.random(),
      timestamp: new Date().toISOString(),
      contactId: parseInt(id),
      isOptimistic: true,
    });

    const message = await sendMessageAction(formData);

    setMessages((messages) => [message, ...messages] as Message[]);
  }
}
