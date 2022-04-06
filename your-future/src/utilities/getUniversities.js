export function getUniversities(param) {
  fetch("/universities", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ institution: param }),
  }).then((res) => {
    res.json().then((data) => {
      return;
    });
  });
}
