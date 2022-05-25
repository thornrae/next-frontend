import Layout from "@/components/Layout";
import Link from "next/link";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

export default function HomePage({ events }) {
  //this console logs on the client
  //now able to use data provided as props from server
  //in UI
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>no events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events: events.slice(0, 3) },
    revalidate: 1,
  };
}
