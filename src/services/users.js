import axios from "axios";

const getRandomUser = () => {
  const randomId = Math.ceil(Math.random() * 10);
  return axios
    .get(`https://jsonplaceholder.typicode.com/users/${randomId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export { getRandomUser };
