
export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    owner: {
      login: string;
      avatar_url: string;
    };
    html_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
  }
  