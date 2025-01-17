export const handleChange = (event, data, callback) => {
  callback({ ...data, [event.target.name]: event.target.value });
};
