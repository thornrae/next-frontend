import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config/index";

export default function EventsPage({ events }) {
  //this console logs on the client
  //now able to use data provided as props from server
  //in UI
  console.log(events);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>no events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
