// AdminPanel.jsx

import React, { useState } from "react";

const AdminPanel = ({ socket }) => {
  const [notificationText, setNotificationText] = useState("");

  const handleSendNotification = () => {
    // Emit the notification to the server
    socket.emit("sendNotification", notificationText);
    // Clear the input field after sending the notification
    setNotificationText("");
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <textarea
        value={notificationText}
        onChange={(e) => setNotificationText(e.target.value)}
      />
      <button onClick={handleSendNotification}>Send Notification</button>
    </div>
  );
};

export default AdminPanel;
