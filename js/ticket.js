const { createClient } = supabase;

const _supabase = createClient(
  "https://dfolxdrohaaekujfpboi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmb2x4ZHJvaGFhZWt1amZwYm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQzNzgyNTEsImV4cCI6MTk4OTk1NDI1MX0.Ag6lVizJ2oA9PRwPUeuUfCp56PVbe3XUutoet5NJfZ4"
);

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
  console.log(access_token )
  fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `token ${access_token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.warn(err));
}

document.getElementById("get-ticket").addEventListener("click", async () => {
  const { data, error } = await _supabase.auth.signInWithOAuth({
    redirectTo: "http://localhost:3000/ticket.html",
    provider: "github",
  });
  console.log(data, error);
});
