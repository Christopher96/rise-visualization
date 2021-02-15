import { useContext, useEffect } from "react";
import Context from "../context";

export default function Home() {
  const context = useContext(Context);

  useEffect(() => {
    context?.setPage("timespent");
  });

  return (
    <div>
      <p>Time spent</p>
    </div>
  );
}
