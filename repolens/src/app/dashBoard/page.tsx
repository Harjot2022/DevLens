"use client";

import { Button } from "@/components/ui/button";
import{Input} from "@/components/ui/input";
import axios from "axios";
import {useState} from "react";
import{RepoCard} from "@/components/ui/dashBoard/repo-card";

interface Repo {
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
}


export default function Dashboard(){

  const[RepoInfo, setRepoInfo] = useState<Repo | null>(null);
  const[repoUrl, setRepoUrl] = useState("");
  const[loading, setLoading] = useState(false);

  function validateGitHubUrl(repoUrl: string): string {
  const githubRegex = /^https?:\/\/(www\.)?github\.com\/.+/;

  if (!githubRegex.test(repoUrl.trim())) {
    return "Invalid GitHub URL";
  }

  return "Valid GitHub URL";
}

  async function analyzeRepo(){
    try {
    setLoading(true);
    const validationMessage = validateGitHubUrl(repoUrl);
    if (validationMessage === "Invalid GitHub URL") {
      alert(validationMessage);
      setLoading(false);
      return;
    } 
    console.log("Analyzing repository:", repoUrl);
    const res = await axios.post("/api/analyze", {url: repoUrl});
    console.log(res.data);
    setRepoInfo(res.data);
    setLoading(false);
  } catch (error) {
    console.error("Error analyzing repository:", error);
    setLoading(false);
  }
}

  return(
    
    <div>
      <div className="flex items-center justify-between px-8 py-2 sticky top-0 " > 
        <Input placeholder="Enter GitHub repository Url "
         className = "mx-4 w-full" 
         value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Button variant="secondary" 
          onClick={analyzeRepo} 
          disabled={loading} >
        {loading ? "Analyzing...": "Analyze"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {RepoInfo && (
          <RepoCard repoInfo={RepoInfo} />
        )}

        {RepoInfo && (
          <RepoCard repoInfo={RepoInfo} />
        )}

          {RepoInfo && (
          <RepoCard repoInfo={RepoInfo} />
        )}
        
      </div> 
    </div>

  )
}