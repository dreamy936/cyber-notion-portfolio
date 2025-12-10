// lib/notion.ts
// ✅ 纯原生 Fetch 版本，专治各种 "is not a function" 疑难杂症

export const getDatabase = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const apiKey = process.env.NOTION_API_KEY;

  if (!databaseId || !apiKey) {
    throw new Error("Missing Notion secrets");
  }

  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Status",
          select: { equals: "Published" }, // 你的 Select 过滤器
        },
        sorts: [{ property: "Date", direction: "descending" }],
      }),
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) throw new Error("Notion API Error");
  const data = await response.json();
  return data.results;
};

export const getPageBySlug = async (slug: string) => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const apiKey = process.env.NOTION_API_KEY;

  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Slug",
          rich_text: { equals: slug },
        },
      }),
    }
  );
  
  if (!response.ok) throw new Error("Slug Fetch Error");
  const data = await response.json();
  return data.results[0];
};

export const getPageBlocks = async (pageId: string) => {
  const apiKey = process.env.NOTION_API_KEY;
  const response = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
      },
    }
  );
  if (!response.ok) return [];
  const data = await response.json();
  return data.results;
};