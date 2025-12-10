import { getDatabase } from "@/lib/notion";
import { CyberHome } from "@/app/components/CyberHome";

export default async function Home() {
  // 1. 服务端获取真实数据
  const posts = await getDatabase();

  // 2. 将数据传给客户端组件进行渲染
  return <CyberHome posts={posts} />;
}