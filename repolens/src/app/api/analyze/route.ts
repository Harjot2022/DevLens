import {NextResponse} from "next/server";
import {extractRepoInfoFromUrl} from "../../utils/github";

export async function POST(request: Request){
    const body = await request.json();
    const repoInfo = await extractRepoInfoFromUrl(body.url);
    console.log(repoInfo);
    if(!repoInfo){
        return NextResponse.json({error: "Invalid repository URL"}, {status: 400});
    }
    const githubResponse = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`);
    const githubData = await githubResponse.json();
    return NextResponse.json({
        owner: repoInfo.owner,
        repo: repoInfo.repo,
        description: githubData.description,
        stars: githubData.stargazers_count,
        forks: githubData.forks_count,
        language: githubData.language,
    })
}