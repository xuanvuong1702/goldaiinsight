import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

type Article = {
  title: string;
  source?: string;
  time?: string;
  content?: string;
};

type CommentItem = {
  id: string;
  author: string;
  text: string;
  createdAt: string; // ISO
};

function storageKeyFor(article: Article) {
  // use title as key slice; ensure safe
  const key = `news_comments:${encodeURIComponent(article.title)}`;
  return key;
}

export default function NewsModal({ open, onClose, article }: { open: boolean; onClose: () => void; article: Article | null }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!open || !article) return;
    // load persisted comments for this article
    try {
      const raw = localStorage.getItem(storageKeyFor(article));
      if (raw) setComments(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, [open, article]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!article) return;
    try {
      localStorage.setItem(storageKeyFor(article), JSON.stringify(comments));
    } catch (e) {
      // ignore
    }
  }, [comments, article]);

  if (!open || !article) return null;

  const handleAdd = () => {
    const t = text.trim();
    if (!t) return;
    const c: CommentItem = {
      id: String(Date.now()),
      author: "You",
      text: t,
      createdAt: new Date().toISOString(),
    };
    setComments((s) => [c, ...s]);
    setText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-start justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{article.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{article.source} · {article.time}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-auto space-y-4">
          {article.content ? (
            <ReactMarkdown
              // className="prose prose-sm dark:prose-invert text-slate-700 dark:text-slate-200"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {article.content}
            </ReactMarkdown>
          ) : (
            <div className="prose prose-sm dark:prose-invert text-slate-700 dark:text-slate-200">
              <p>Không có nội dung chi tiết cho mục tin này. Dưới đây là khu vực bình luận cho phép người dùng thêm ý kiến của họ.</p>
            </div>
          )}

          <div>
            <div className="mb-2 text-sm font-medium text-slate-700 dark:text-white">Bình luận</div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  className="flex-1 resize-none rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-2 text-sm text-slate-900 dark:text-white"
                  placeholder="Viết bình luận..."
                />
                <div className="flex flex-col">
                  <button onClick={handleAdd} className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-md text-sm">Gửi</button>
                </div>
              </div>

              <div className="space-y-2">
                {comments.length === 0 && <div className="text-sm text-slate-500">Chưa có bình luận nào.</div>}
                {comments.map((c) => (
                  <div key={c.id} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{c.author}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{new Date(c.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-200 mt-1">{c.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
