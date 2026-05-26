"use client";
import axios from "axios";
import {useState} from "react";

export default function Home() {
  
  const[repoUrl, setRepoUrl] = useState("");

  async function analyzeRepo(){
    console.log("Analyzing repository:", repoUrl);
    const res = await axios.post("/api/analyze", {url: repoUrl});
    console.log(res.data);
  
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="enter github url..." 
        className="w-full p-2 border border-gray-300 rounded-md mb-4" 
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md"
      onClick={analyzeRepo}  >
        Analyze
      </button>
      <p>{repoUrl}</p>
    </div>
  );
}
