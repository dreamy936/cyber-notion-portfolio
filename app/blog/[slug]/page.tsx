import { getPageBySlug, getPageBlocks } from "@/lib/notion";
import Link from "next/link";
import { MatrixRain } from "@/app/components/MatrixRain";
import { ChevronLeft, Calendar, Tag, Terminal, AlertTriangle } from "lucide-react";

// 🎨 超级渲染器：针对赛博风格优化
const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p className="mb-6 text-gray-300 leading-8 text-lg font-sans">
          {value.rich_text.map((t: any) => t.plain_text).join("")}
        </p>
      );

    case "heading_1":
      return (
        <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-[#ededed] border-l-4 border-[#8a0303] pl-4 glow-text-dried-blood">
          {value.rich_text[0]?.plain_text}
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-[#00ff9d] flex items-center gap-2">
          <span className="text-[#8a0303] text-sm">&gt;&gt;</span>
          {value.rich_text[0]?.plain_text}
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-xl font-bold mt-8 mb-4 text-[#00ff9d]/80">
          {value.rich_text[0]?.plain_text}
        </h3>
      );

    case "bulleted_list_item":
      return (
        <li className="ml-6 list-none relative pl-6 mb-2 text-gray-300">
          <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-[#8a0303] rounded-full"></span>
          {value.rich_text.map((t: any) => t.plain_text).join("")}
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="ml-6 list-decimal text-gray-300 mb-2 marker:text-[#00ff9d]">
          {value.rich_text.map((t: any) => t.plain_text).join("")}
        </li>
      );

    case "code":
      return (
        <div className="relative group my-8 corrupted-card bg-[#0a0a0a] border border-[#333] rounded overflow-hidden">
          <div className="flex justify-between items-center px-4 py-2 bg-[#111] border-b border-[#333]">
            <span className="text-xs text-[#00ff9d] font-mono">{value.language}</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
            </div>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-[#00ff9d] bg-black/50">
            <code>{value.rich_text[0]?.plain_text}</code>
          </pre>
        </div>
      );

    case "image":
      const src = value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption.length ? value.caption[0].plain_text : "";
      return (
        <figure className="my-10 relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={src} 
            alt={caption} 
            className="rounded border border-[#333] shadow-2xl max-h-[600px] object-cover mx-auto group-hover:border-[#8a0303] transition-colors duration-500" 
          />
          {caption && <figcaption className="text-center text-gray-500 text-sm mt-3 font-mono">{caption}</figcaption>}
          <div className="absolute inset-0 ring-1 ring-inset ring-[#00ff9d]/20 pointer-events-none rounded"></div>
        </figure>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-2 border-[#00ff9d] bg-[#00ff9d]/5 p-6 rounded-r italic text-gray-300 relative">
          <AlertTriangle className="absolute top-4 right-4 w-4 h-4 text-[#00ff9d]/20" />
          {value.rich_text.map((t: any) => t.plain_text).join("")}
        </blockquote>
      );

    default:
      return null;
  }
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // 1. 获取文章元数据
  const page = await getPageBySlug(slug);

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white font-mono relative overflow-hidden">
        <MatrixRain />
        <h1 className="text-6xl font-bold mb-4 text-[#8a0303] glitch-always">404</h1>
        <p className="text-[#00ff9d]">DATA_SHARD_NOT_FOUND</p>
        <p className="text-gray-600 mt-2 text-sm">Target slug: {slug}</p>
        <Link href="/" className="mt-8 px-6 py-2 border border-[#333] hover:border-[#00ff9d] hover:text-[#00ff9d] transition-colors z-10">
          RETURN_TO_BASE
        </Link>
      </div>
    );
  }

  // 2. 获取正文内容
  const blocks = await getPageBlocks(page.id);
  
  const title = page.properties.Name.title[0]?.plain_text || "Untitled";
  const date = page.properties.Date.date?.start || "Unknown Date";
  const tag = page.properties.Tags?.multi_select[0]?.name || "LOG";

  return (
    <main className="min-h-screen relative bg-[#050505] text-white font-mono selection:bg-[#8a0303] selection:text-white">
      <div className="fixed inset-0 z-0 opacity-20">
        <MatrixRain />
      </div>

      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-black to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#00ff9d]/70 hover:text-[#00ff9d] hover:translate-x-[-5px] transition-all duration-300 group">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm tracking-widest">ABORT & RETURN</span>
          </Link>
        </div>
      </nav>

      <article className="relative z-10 max-w-3xl mx-auto px-6 py-32">
        {/* 文章头部 */}
        <header className="mb-16 text-center border-b border-[#333] pb-12">
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-gray-500 mb-6">
            <span className="flex items-center gap-1.5 px-3 py-1 border border-[#333] rounded-full bg-[#111]">
              <Calendar className="w-3 h-3" /> {date}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 border border-[#333] rounded-full bg-[#111] text-[#00ff9d]">
              <Tag className="w-3 h-3" /> {tag}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#ededed] glow-text-dried-blood leading-tight">
            {title}
          </h1>
          
          <div className="flex justify-center">
             <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#8a0303] to-transparent" />
          </div>
        </header>

        {/* 文章正文 */}
        <div className="space-y-2">
          {blocks.map((block: any) => (
            <div key={block.id}>{renderBlock(block)}</div>
          ))}
        </div>

        {/* 底部 */}
        <div className="mt-20 pt-12 border-t border-[#333] text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <Terminal className="w-8 h-8 text-[#333]" />
            <p className="text-xs text-gray-600 tracking-widest">END_OF_TRANSMISSION</p>
          </div>
        </div>
      </article>
    </main>
  );
}