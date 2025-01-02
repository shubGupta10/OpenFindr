import { octokit } from "@/app/utils/Octokit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const language = searchParams.get('language') || '';

        //building the query for good first issues
        let query = "label:\"good first issue\" state:open";
        if (language) query += ` language:${language}`;

        const response = await octokit.request('GET /search/issues', {
            q: query,
            sort: 'created',
            order: 'desc',
        })

        //making the url to include relevant information
    const issues = response.data.items.map((item: any) => {
        return {
            id: item.id,
            title: item.title,
            number: item.number,
            html_url: item.html_url,
            repository: {
                name: item.repository_url.split("/").slice(-1)[0],
                full_name: `${item.repository_url.split("/").slice(-2).join("/")}`,
                html_url: item.repository_url.replace("api.github.com/repos", "github.com"),
            },
            created_at: item.created_at,
            updated_at: item.updated_at,
            labels: item.labels,
            state: item.state,
        };
    });

    return NextResponse.json({
        total_count: response.data.total_count,
        items: issues,
      });
} catch (error: any) {
    console.error("Error fetching good first issues:", error.message);
    return NextResponse.json(
        { error: "Failed to fetch good first issues" },
        { status: 500 }
    );
}   
}