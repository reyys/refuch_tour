export interface Blog {
  _id: string;
  slug: string;
  title: string;
  content: string;
  imageUrl: string;
  tags: string[];
  author: string;
}
