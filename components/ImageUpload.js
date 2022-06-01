import React from "react";
import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //look into FormData -- js built in
    const formData = new FormData();
    //append image from state
    formData.append("files", image);
    //need these three things if you want to connect to event
    //event being a collection type in strapi
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    //then make response

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    //e.target.files returns an array
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="upload" className="btn" />
      </form>
    </div>
  );
}
