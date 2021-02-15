import React, { useContext, useEffect } from "react";
import Context from "../context";

export default function Activity() {
  const context = useContext(Context);

  useEffect(() => {
    context?.setPage("activity");
  });

  return (
    <div>
      <p>Activity</p>
    </div>
  );
}
