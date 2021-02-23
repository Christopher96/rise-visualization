import React, { useContext, useEffect } from "react";
import Staples from "../components/Staples";
import Context from "../context";

export default function Activity() {
  const context = useContext(Context);

  useEffect(() => {
    context?.setPage("activity");
  });

  return (
    <div>
      <Staples />
    </div>
  );
}
