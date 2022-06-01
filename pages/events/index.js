import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Link from "next/link";
import { API_URL } from "@/config/index";

const PER_PAGE = 5;

export default function EventsPage({ events, page, total }) {
  //this console logs on the client
  //now able to use data provided as props from server
  //in UI
  // console.log(events);

  //need to figure out last page
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>no events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //destructuring query and getting page
  // export async function getStaticProps() {
  // console.log("pg", page);

  //calculate start page
  //+ same as parseInt
  //with thise code, if url is: /events?page=2 -- it will show
  //events on second page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //need to fetch total number events to pass as a prop into our component
  //in the return body
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}
