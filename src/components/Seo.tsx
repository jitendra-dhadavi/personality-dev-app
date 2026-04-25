import { useEffect } from "react";

type Props = {
  title: string;
  description?: string;
};

function upsertMeta(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertOg(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export default function Seo({ title, description }: Props) {
  useEffect(() => {
    document.title = title;
    if (description) {
      upsertMeta("description", description);
      upsertOg("og:description", description);
    }
    upsertOg("og:title", title);
  }, [title, description]);

  return null;
}

