import { NextRequest, NextResponse } from "next/server";
import { octokit } from "@/app/utils/Octokit";

if (!process.env.GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is not defined in environment variables");
}



const languages = ["javascript", "typescript", "python", "java", "go", "rust"];
const popularity = ["high", "medium", "low"];
const keywords = [
  "frontend",
  "backend",
  "fullstack",
  "data-science",
  "machine-learning",
  "AI",
  "web-development",
  "devops",
  "cloud",
  "database",
  "blockchain",
  "open-source",
  "API",
  "automation",
  "security",
  "testing",
  "performance",
  "ui/ux",
  "design",
  "serverless",
  "microservices",
  "distributed-systems",
  "graphql",
  "rest-api",
  "typescripts",
  "react",
  "vue",
  "angular",
  "nextjs",
  "nodejs",
  "python",
  "ruby",
  "go",
  "java",
  "rust",
  "flutter",
  "swift",
  "kotlin",
  "docker",
  "kubernetes",
  "ci/cd",
  "scrum",
  "open-standards",
  "accessibility",
  "sustainability",
  "cryptocurrency",
  "smart-contracts",
  "blockchain-apps",
  "ecosystem",
  "ai-chatbots",
  "enterprise",
  "cross-platform",
  "peer-to-peer",
];


const popularityMapping: Record<string, string> = {
  high: ">10000",
  medium: "1000..10000",
  low: "<1000",
};



export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");
  const popularityMode = searchParams.get("popularity")?.toLocaleLowerCase();
  const keyword = searchParams.get("keyword");

  // Validate the language parameter
  if (!language || !languages.includes(language.toLowerCase())) {
    return NextResponse.json(
      { error: "Invalid or unsupported language" },
      { status: 400 }
    );
  }
  //validating the popularity mode
  if (popularityMode && !popularity.includes(popularityMode)) {
    return NextResponse.json(
      { error: "Invalid popularity mode" },
      { status: 400 }
    );
  }
  
  //validating the keyword
  if(keyword && !keywords.includes(keyword.toLowerCase())){
    return NextResponse.json(
      { error: "Invalid keyword" },
      { status: 400 }
    );
  }

  const starsFilter = popularityMode ? `stars:${popularityMapping[popularityMode]}` : "";

  try {
    const query = [`language:${language}`];
    if (starsFilter) query.push(starsFilter);
    if (keyword) query.push(keyword);

     const response = await octokit.request("GET /search/repositories", {
      q: query.join(" "),
      sort: "stars",
      order: "desc",
      per_page: 10,
    });

    return NextResponse.json(response.data.items);
  } catch (error: any) {
    console.error("Error fetching repositories:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
