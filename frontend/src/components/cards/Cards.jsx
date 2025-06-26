import { useState } from "react";
import Button from "../button/Button";
import Textfield from "../textfield/Textfield";
import "./cards.css";

const Cards = ({ title = "", description = "" }) => {
  const [postTitle, setPostTitle] = useState(title);
  const [postDescription, setPostDescription] = useState(description);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setPostTitle(value);
    } else if (name === "description") {
      setPostDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: postTitle,
      description: postDescription,
    };

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const result = await response.json();
      console.log("Post created:", result);
      alert("Post submitted successfully!");
      setPostTitle("");
      setPostDescription("");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="card-container">
      <form className="card" onSubmit={handleSubmit}>
        <Textfield
          label="Title"
          name="title"
          value={postTitle}
          onChange={handleChange}
          required
        />
        <Textfield
          label="Description"
          name="description"
          value={postDescription}
          onChange={handleChange}
          required
        />
        <Button label="Submit" type="submit" />
      </form>

      <div className="card-preview">
        {postTitle === "" && postDescription === "" ? (
          <p>Please fill in the details to see the preview.</p>
        ) : (
          <>
            <h2>{postTitle}</h2>
            <p>{postDescription}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Cards;
