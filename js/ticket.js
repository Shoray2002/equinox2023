const getTicketBtn = document.getElementById("get-ticket");

const { createClient } = supabase;

// const _supabase = createClient(
//   "https://dfolxdrohaaekujfpboi.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmb2x4ZHJvaGFhZWt1amZwYm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQzNzgyNTEsImV4cCI6MTk4OTk1NDI1MX0.Ag6lVizJ2oA9PRwPUeuUfCp56PVbe3XUutoet5NJfZ4"
// );

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?#&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const access_token = getParameterByName("access_token");
const provider_token = getParameterByName("provider_token");
const refresh_token = getParameterByName("refresh_token");

if (access_token) {
  console.log(access_token);
  fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `   ${access_token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.warn(err));
}

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// const username = getParameterByName('username');
const username = "shoray2002";

if (username) {
  getTicketBtn.remove();

  document.querySelector(".qr-code").style = "";

  // TODO: Implement Hashing and storing registered user in backend
  const salt = 'equinox' // to obtain from backend
  sha256(`${salt}-${username}`).then((hash) => {
    const qrcode = new QRCode(document.querySelector(".qr-code"), {
      text: `${hash}`,
      width: 180,
      height: 180,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    console.log(qrcode);

    let download = document.createElement("button");
    document.querySelector(".qr-code").appendChild(download);

    let download_link = document.createElement("a");
    download_link.setAttribute(
      "download",
      `Event pass - Equinox ${username}.png`
    );
    download_link.innerText = "Download Event Pass";

    download.appendChild(download_link);

    if (document.querySelector(".qr-code img").getAttribute("src") == null) {
      setTimeout(() => {
        download_link.setAttribute(
          "href",
          `${document.querySelector("canvas").toDataURL()}`
        );
      }, 300);
    } else {
      setTimeout(() => {
        download_link.setAttribute(
          "href",
          `${document.querySelector(".qr-code img").getAttribute("src")}`
        );
      }, 300);
    }
  });
}

getTicketBtn.addEventListener("click", async () => {
  const { data, error } = await _supabase.auth.signInWithOAuth({
    redirectTo: "http://localhost:3000/ticket.html",
    provider: "github",
  });
  console.log(data, error);
});
