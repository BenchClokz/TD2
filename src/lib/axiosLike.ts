export type ApiPost = {
  id: number;
  title: string;
  body: string;
};

export async function getPosts(): Promise<ApiPost[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const posts = (await response.json()) as ApiPost[];
  return posts;
}

export async function createPost(payload: { title: string; body: string }): Promise<ApiPost> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(payload),
  });

  const created = (await response.json()) as ApiPost;
  return created;
}
