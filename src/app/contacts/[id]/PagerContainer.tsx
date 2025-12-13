import Pager from "../../components/Pager";

export default async function PagerContainer({ contactId }: { contactId: number }) {
  
  return <Pager contactId={contactId} />;
}
