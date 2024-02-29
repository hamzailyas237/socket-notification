// NotificationComponent.jsx

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("Connected to server");
});

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for incoming notifications
    socket.on("receiveNotification", (notification) => {
      console.log("🚀 ~ socket.on ~ notification:", notification);
      // Update the notifications state with the new notification
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      // Disconnect the socket when the component unmounts
      socket.off("receiveNotification");
    };
  }, []);
  console.log("🚀 ~ NotificationComponent ~ notifications:", notifications);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
