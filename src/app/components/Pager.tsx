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
import fetchMessagesAction from "../actions/fetchMessagesAction";
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
  const [, formAction, isPending] = useActionState(sendMessage, null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, startTransition] = useTransition();
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (prevMessages: Message[], newMessage: Message) => [
      newMessage,
      ...prevMessages,
    ]
  );

  useEffect(() => {
    startTransition(async () => {
      fetchMessagesAction(contactId).then((data) => {
        setMessages(data);
      });
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
          disabled={isLoading}
          name="content"
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
    addOptimisticMessage({
      id: Date.now(),
      content: formData.get("content") as string,
      timestamp: new Date().toISOString(),
      contactId: contactId,
      isOptimistic: true,
    });

    const message = await sendMessageAction(formData);

    setMessages((prevMessages) => [message, ...prevMessages]);
  }
}
