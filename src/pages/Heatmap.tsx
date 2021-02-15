import React, { useContext, useEffect } from "react";
import Context from "../context";

export default function Predict() {
  const context = useContext(Context);

  useEffect(() => {
    context?.setPage("heatmap");
  });

  return (
    <div>
      <p>Heatmap</p>
    </div>
  );
}
