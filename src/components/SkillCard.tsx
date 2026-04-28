import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowBigUp,
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  MessageSquare,
} from "lucide-react";

const SkillCard = ({
  authorEmail,
  category,
  createdAt,
  description,
  installCommand,
  tags,
  title,
}: SkillRecord) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      // Reset the icon after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
  return (
    <article className="skill-card">
      {/*<Link to:'/skills' aria-label={`Open ${title}`} className="overlay"*/}
      {/*/>*/}
      <Link
        to="/skills"
        tabIndex={-1}
        aria-label={`Open ${title}`}
        className="overlay"
      />
      <div className="chrome">
        <div className="chrome-bar">
          <div className="lights">
            <div className="light red" />
            <div className="light amber" />
            <div className="light green" />
          </div>
          <div className="host">registry.sh</div>
        </div>
      </div>
      <div className="body">
        <div className="meta">
          <div className="author">
            <img src="/logo512.png" alt="author avatar" className="avatar" />
            <div className="author-copy">
              <p>Adrian</p>
              <p>{new Date(createdAt as string).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="category">{category}</p>
        </div>
        <div className="summary">
          <Link to="/skills" className="title-link">
            <h3>{title}</h3>
          </Link>
          <p>{description}</p>
        </div>
      </div>
      <div className="command">
        <div className="command-copy flex items-center justify-between group">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-mono">{">_"}</span>
            <p className="font-mono text-sm">{installCommand}</p>
          </div>

          <button
            onClick={handleCopy}
            className="p-2 hover:bg-zinc-800 rounded-md  z-50 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            )}
          </button>
        </div>
      </div>
      <div className="footer">
        <div className="stats">
          <button type="button" className="upvote" disabled>
            <ArrowBigUp size={16} fill="currentColor" />
            <span>{tags.length}</span>
          </button>
          <div className="comments">
            <MessageSquare size={14} />
            <span>{authorEmail ? 1 : 0}</span>
          </div>
        </div>
        <div className="actions">
          <Link to="/skills" className="open" title={`Open ${title}`}>
            <span>Open</span>
            <ArrowUpRight size={14} />
          </Link>
          <button
            type="button"
            className="save"
            aria-label="saved state"
            disabled
          >
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default SkillCard;
