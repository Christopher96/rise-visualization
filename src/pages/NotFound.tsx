import { useContext, useEffect } from "react";
import Context from "../context";

export default function Home() {
  const context = useContext(Context);

  useEffect(() => {
    context?.setPage("not-found");
  });

  return (
    <div>
      <p>404: Not found</p>
    </div>
  );
}
