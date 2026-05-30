import {NextResponse} from "next/server";
import {extractRepoInfoFromUrl} from "../../utils/github";

function validateGitHubUrl(input: string): string {
  const githubRegex = /^https?:\/\/(www\.)?github\.com\/.+/;

  if (!githubRegex.test(input.trim())) {
    return "Invalid GitHub URL";
  }

  return "Valid GitHub URL";
}

export async function POST(request: Request){
    const body = await request.json();
    
    const validationMessage = validateGitHubUrl(body.url);
    
    if (validationMessage === "Invalid GitHub URL") {
        return NextResponse.json({error: validationMessage}, {status: 400});
    }

    const repoInfo = await extractRepoInfoFromUrl(body.url);
    console.log(repoInfo);
    if(!repoInfo){
        return NextResponse.json({error: "Invalid repository URL"}, {status: 400});
    }
    
    const owner = repoInfo.owner.trim();
    const repo = repoInfo.repo.trim();

    const githubResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme` , {
        headers: {
        Accept: "application/vnd.github.html+json",
      },
    }
    );
    
    const githubData = await githubResponse.json();
    const readmeData = await readmeResponse.text();
    // console.log(readmeResponse);
    console.log(readmeData);

    return NextResponse.json({
        name: repoInfo.repo,
        owner: repoInfo.owner,
        description: githubData.description,
        stars: githubData.stargazers_count,
        forks: githubData.forks_count,
        language: githubData.language,
        // readme: readmeData.content,
    })
}