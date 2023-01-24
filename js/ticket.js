/* Disable source code inspection */

/* Code */
const btn = document.querySelector("#get-ticket");

const params = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);

const createUUID = () => {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

const CLIENT_ID = "fd4fa0a90ffc51523f79";
const CLIENT_SECRET = "a922b0f74b18b671f98eb35bb9fea07fae2bd1d0";
const REDIRECT_URI = "http://localhost:5501/ticket.html";
const UUID = createUUID();

const fetchUserData = async (code) => {
  fetch(
    `https://github.com/login/oauth/access_token&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.cloak-preview",
      },
      body: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI,
      },
    }
  )
    .then((res) => console.log(res))
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.warn(err));
};

if (params.code) {
  btn.remove();
  fetchUserData(params.code);
}

btn.addEventListener("click", async () => {
  console.log(params);
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email&state=${UUID}`;
});
