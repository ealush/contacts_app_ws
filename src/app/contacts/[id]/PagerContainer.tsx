import Pager from "../../components/Pager";
import { getMessages } from "../../actions/getMessages";

export default async function PagerContainer({
  contactId,
}: {
  contactId: number;
}) {
  const messages = await getMessages(contactId);

  return <Pager contactId={contactId} initialMessages={messages} />;
}
