const fetchSendEmail = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      email: string;
      firstname: string;
      lastname: string;
      object: string;
      message: string;
      pseudo: string;
    };
  }
) => {
  let response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(arg),
  });
  let json = await response.json();
  return json;
};

export default fetchSendEmail;
