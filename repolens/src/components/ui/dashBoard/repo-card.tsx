import{
    Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../card";
import {
Star,
GitFork,
} from "lucide-react"
// import { Github } from "@phosphor-icons/react";

interface Repo {
    name: string;
    owner: string;
    description: string;
    stars: number;
    forks: number;
}

export function RepoCard({ repoInfo }: { repoInfo: Repo }) {
  return (
    <div className="w-full max-w-md bg-zinc-800 rounded-lg shadow-md my-4">
        <CardHeader className="space-y-3">
            <div className="flex items-center gap-2">
             {/* <Github className="w-5 h-5 text-zinc-400" />  */}
                <CardTitle className="text-xl pt-4"> {repoInfo.name} </CardTitle>
            </div>
            <CardDescription className="text-zinc-400 leading-relaxed text-md"> 
                    {repoInfo.owner} 
            </CardDescription>
            <CardDescription className="text-zinc-400 leading-relaxed"> 
            {repoInfo.description} 
            </CardDescription>
    </CardHeader> 
    <CardContent className="flex items-center justify-between align-around px-4 py-2"> 
        <div className="flex items-center gap-6 text-sm text-zinc-300"> 
            <div className="flex items-center gap-2"> 
                <Star className="w-4 h-4" /> <span>{repoInfo.stars}</span> 
            </div> 
            <div className="flex items-center gap-2"> 
                <GitFork className="w-4 h-4" /> 
                <span>{repoInfo.forks}</span> 
            </div> 
            </div> 
    </CardContent>
    </div>
     
  )
}   