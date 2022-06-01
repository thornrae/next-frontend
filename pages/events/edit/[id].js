import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import moment from "moment";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function EditEventPage({ evt }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const imageUploaded = async (e) => {
    //get latest image and set preview to that
    //so, once uploaded, we want this function to be called and then
    //we make another request to get the event so we can get latest image
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    console.log(data);
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //form validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("please fill in the field");
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("something went wrong");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              //npm package to format date
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="name">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="update event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image
          src={imagePreview}
          height={100}
          width={170}
          alt={imagePreview.name}
        />
      ) : (
        <div>
          <p>no image uploaded</p>
        </div>
      )}

      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  console.log("res,,,,,", res);
  const evt = await res.json();
  console.log("evt....", evt);

  return {
    props: {
      evt,
    },
  };
}
