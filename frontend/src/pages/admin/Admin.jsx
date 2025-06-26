import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./admin.css";

const socket = io("http://localhost:3000");

const Admin = () => {
  const [data, setData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => {
        if (!response.ok) throw new Error("Network error");
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  useEffect(() => {
    // Listen for new post event
    socket.on("new-post", (post) => {
      setData((prev) => [post, ...prev]); // Add new post to top
      setNotification(`New post added: ${post.title}`);

      setTimeout(() => setNotification(null), 10000);
    });

    // Cleanup
    return () => {
      socket.off("new-post");
    };
  }, []);

  const toggleDescription = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      {notification && <div className="notification">{notification}</div>}
      <p>Here are posts as follows:</p>
      <div className="admin-cards">
        {data.map((post) => (
          <div
            key={post._id}
            className="cards"
            onClick={() => toggleDescription(post._id)}
            style={{ cursor: "pointer" }}
          >
            <h2>{post.title}</h2>
            {expandedId === post._id && <p>{post.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
