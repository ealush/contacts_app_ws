"use client";

import React, { useState, useActionState, useOptimistic } from "react";
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
  const [messages, formAction, isPending] = useActionState(
    sendMessage,
    initialMessages
  );
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (prevMessages: Message[], newMessage: Message) => [
      newMessage,
      ...prevMessages,
    ]
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
            className={clsx(styles.messageItem, {
              [styles.optimistic]: msg.isOptimistic,
            })}
          >
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
          name="content"
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
    addOptimisticMessage({
      id: Date.now(),
      content: formData.get("content") as string,
      timestamp: new Date().toISOString(),
      contactId: contactId,
      isOptimistic: true,
    });

    const result = await sendMessageAction(formData);

    return [result, ...prevState] as Message[];
  }
}
