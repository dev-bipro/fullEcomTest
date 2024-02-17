const useField = (name = "", email = "", pass = "", path) => {
  console.log(name, email, pass, path);
  const error = {};

  if (!name && path == "/create") {
    error.name = "enter your name";
  }
  if (!email) {
    error.email = "enter your email";
  }
  if (!pass) {
    error.pass = "enter your password";
  }

  return error;
};
module.exports = useField;
