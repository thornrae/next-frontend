import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import qs from "qs";
import Link from "next/link";
import { useRouter } from "next/router";

import { API_URL } from "@/config/index";

export default function SearchPage({ events }) {
  //this console logs on the client
  //now able to use data provided as props from server
  //in UI
  const router = useRouter();
  console.log(events);
  return (
    <Layout title="Search Results">
      <Link href="/events"> Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>no events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
