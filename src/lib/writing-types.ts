export interface WritingPostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  published: boolean;
  ogImage?: string;
}

export interface WritingPost extends WritingPostMeta {
  body: string;
}
