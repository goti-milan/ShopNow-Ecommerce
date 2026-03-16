"use client";

import { cn } from "@/lib/utils";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function ShareButton({
  path,
  title,
  className,
  iconClassName,
  copiedTitle = "Link copied",
  shareTitle = "Share",
}: {
  path: string;
  title?: string;
  className?: string;
  iconClassName?: string;
  copiedTitle?: string;
  shareTitle?: string;
}) {
  const [didCopyShareLink, setDidCopyShareLink] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = path.startsWith("http")
      ? path
      : `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await copyText(url);
      setDidCopyShareLink(true);
      window.setTimeout(() => setDidCopyShareLink(false), 1200);
    } catch {
      // no-op: sharing is best-effort
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label={shareTitle}
      title={didCopyShareLink ? copiedTitle : shareTitle}
      className={cn(className)}
    >
      {didCopyShareLink ? (
        <Check className={cn("h-4 w-4", iconClassName)} />
      ) : (
        <Share2 className={cn("h-4 w-4", iconClassName)} />
      )}
    </button>
  );
}

