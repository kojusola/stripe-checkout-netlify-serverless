export async function handleSendMail() {
  let params = new URL(document.location).searchParams;
  const sessionId = params.get("sessionId");
  const data = {
    sessionId: sessionId,
  };
  const response = await fetch("/.netlify/functions/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  // console.log(response);
}
