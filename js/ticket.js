const { createClient } = supabase;
const _supabase = createClient(
  "https://dfolxdrohaaekujfpboi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmb2x4ZHJvaGFhZWt1amZwYm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQzNzgyNTEsImV4cCI6MTk4OTk1NDI1MX0.Ag6lVizJ2oA9PRwPUeuUfCp56PVbe3XUutoet5NJfZ4"
);
document.getElementById("get-ticket").addEventListener("click", async () => {
  const { data, error } = await _supabase.auth.signInWithOAuth({
    provider: "github",
  });
  console.log(data, error);
});
