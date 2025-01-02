import { supabase } from "./supabase"

export const savedRepositories = async (
  userEmail: string,
  repo: { id: string; name: string; url: string }
) => {
  const { data, error } = await supabase.from("saved_repos").insert([
      {
          user_Email: userEmail, 
          repo_id: repo.id,
          repo_name: repo.name,
          repo_url: repo.url,
          created_at: new Date().toISOString()
      },
  ]);

  if (error) throw new Error(error.message);
  return data;
};


export const fetchSavedRepositories = async (userEmail: string) => {
    const { data, error } = await supabase
      .from('saved_repos')
      .select('*')
      .eq('user_Email', userEmail);
  
    if (error) throw new Error(error.message);
    return data;
  };
  