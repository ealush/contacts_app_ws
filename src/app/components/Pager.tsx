"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useActionState,
  useOptimistic,
} from "react";
import styles from "./pager.module.css";

import clsx from "clsx";
import { sendMessage } from "../actions/sendMessage";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  contactId: number;
  optimistic?: boolean;
}

type Messages = Message[];

interface PagerProps {
  contactId: number;
  initialMessages: Messages;
}

export default function Pager({ contactId, initialMessages }: PagerProps) {
  const [messages, formAction, pending] = useActionState(send, initialMessages);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (prev: Messages, message: Message) => [message, ...prev]
  );

  async function send(prev: Messages, formData: FormData) {
    addOptimisticMessage({
      id: Date.now(),
      content: formData.get("content") as string,
      timestamp: new Date().toISOString(),
      contactId,
      optimistic: true,
    });
    const message = await sendMessage(formData);

    return [message, ...prev];
  }

  return (
    <div className={styles.pagerContainer}>
      <h3>📟 Pager</h3>

      <div className={styles.messageList}>
        {optimisticMessages.map((msg) => (
          <MessageItem key={msg.id} msg={msg} />
        ))}
      </div>
      <form className={styles.messageForm} action={formAction}>
        <input type="hidden" name="id" value={contactId} />
        <input
          type="text"
          placeholder="Type your message..."
          className={styles.messageInput}
          aria-label="New message input"
          disabled={pending}
          name="content"
        />
        <button type="submit" className={styles.sendButton} disabled={pending}>
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
    <div
      className={clsx(styles.messageItem, {
        [styles.optimitic]: msg.optimistic,
      })}
    >
      <p className={styles.messageContent}>{msg.content}</p>
      <span className={styles.messageTimestamp}>
        {msg.optimistic ? "Just now" : formatTimestamp(msg.timestamp)}
      </span>
    </div>
  );
}
