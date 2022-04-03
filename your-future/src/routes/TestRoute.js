import React, { useEffect, useState } from "react";
import UniversityHome from "./UniversityHome";

function TestRoute() {
  const [data, setData] = useState(0);
  useEffect(() => {
    fetch("/sqltest").then((res) => {
      res.json();
      console.log(res);
    });
  });
  //     .then((d) => {
  //       setData(d["elements"]);
  //       console.log(data);
  //     });
  // }, []);
  return (
    <div>
      {/* <p>
        {data.map((data, idx) => {
          return <p>{data["Institution"]}</p>;
        })}
      </p> */}
    </div>
  );
}

export default TestRoute;
