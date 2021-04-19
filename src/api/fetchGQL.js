import axios from "axios";

async function fetchGQL(text, vars) {
  await axios.post(process.env.GQL_URL, {
    query: text,
    vars,
  }).then(res => res.data)
    .catch(err => console.log(err));
};

export default fetchGQL;
