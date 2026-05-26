export async function extractRepoInfoFromUrl(repoUrl: string){
    try{
        const url = new URL(repoUrl);
        const pathSegments = url.pathname.split("/").filter(Boolean);
        const lastTwo : string[] = pathSegments.slice(-2);
        const [owner , repo] = lastTwo;
        return {owner, repo};
        
        
    } catch (error) {
        console.error("Error extracting repository information:", error);
        return null;
    }
}