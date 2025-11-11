import React from "react";

import KillAMockingbird from "../assets/to.jpg";

const BookCard = () => {
  return (
    <div className="h-60 w-50 border-2 border-gray-300 p-2 rounded-lg shadow-md">
      <a href="https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird">
        <img
          src={KillAMockingbird}
          alt="To Kill a Mockingbird"
          className="h-full w-full object-cover rounded-md"
        />
      </a>
    </div>
  );
};

export default BookCard;
