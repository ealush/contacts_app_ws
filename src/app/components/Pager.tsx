"use client";

import React, { useActionState, useOptimistic } from "react";
import styles from "./pager.module.css";
import sendMessageAction from "../actions/sendMessageAction";
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
  messages: Message[];
}

export default function Pager({
  contactId,
  messages: initialMessages,
}: PagerProps) {
  const [messages, action, isPending] = useActionState(
    sendMessage,
    initialMessages
  );

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (messages: Message[], optimisticMessage: Message) => {
      return [optimisticMessage, ...messages];
    }
  );

  const formatTimestamp = (isoString: string): string => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <div className={styles.pagerContainer}>
      <h3>Pager</h3>

      <div className={styles.messageList}>
        {optimisticMessages.slice(0, 5).map((msg) => (
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
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={isPending}
        >
          Send
        </button>
      </form>
    </div>
  );

  async function sendMessage(prevState: Message[], formData: FormData) {
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

    return [message, ...prevState] as Message[];
  }
}
