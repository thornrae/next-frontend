import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function HomePage({ events }) {
  //this console logs on the client
  //now able to use data provided as props from server
  //in UI
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  // //console log in server
  // console.log(events);

  //want to pass to client side components,
  //return events object as props here
  //pass events object as props to HomePage component
  return {
    props: { events },
    //if not found will make a  new request
    //solution when  using getStaticProps()
    //to account for new/changed data
    revalidate: 1,
  };
}
