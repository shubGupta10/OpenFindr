import { useState } from 'react';
import { savedRepositories } from '@/supabase/SupabaseFunction';
import { Save } from 'lucide-react';

export const SavedRepositories = ({ repo, userEmail }: { repo: any; userEmail: string }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isSaved) return;
    
    try {
      setIsLoading(true);
      await savedRepositories(userEmail, { id: repo.id, name: repo.name, url: repo.html_url });
      setIsSaved(true);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isLoading || isSaved}
      className={`p-1 rounded-full transition-colors ${
        isSaved 
          ? 'text-green-500 bg-green-100 dark:bg-green-900' 
          : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      title={isSaved ? 'Saved' : 'Save Repository'}
    >
      <Save className="h-5 w-5" />
    </button>
  );
};

export default SavedRepositories;

