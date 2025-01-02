 export interface Issue {
    id: number;
    html_url: string;
    title: string;
    repository: {
      html_url: string;
      full_name: string;
    };
    labels: {
      id: number;
      name: string;
      color: string;
    }[];
    created_at: string;
}