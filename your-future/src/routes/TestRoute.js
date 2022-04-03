import React, { useEffect, useState } from "react";
import UniversityHome from "./UniversityHome";

function TestRoute() {
  const [data, setData] = useState(0);
  return (
    <div>
      <UniversityHome></UniversityHome>
    </div>
  );
}

export default TestRoute;
