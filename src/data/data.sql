-- Users
INSERT INTO users (username, email, password) VALUES
  ('White', '1231@exe.com', 'password123'),
  ('jane_smith', 'jane@gmail.com', '123456');

-- Posts
INSERT INTO posts (title, content, author_id) VALUES
  ('Introduction to Node.js', 'Node.js is a JavaScript runtime built on Chrome''s V8 JavaScript engine.', 1),
  ('Building a RESTful API', 'In this article, we will learn how to build a RESTful API using Node.js and Express.', 1),
  ('Deployment Strategies for Node.js Apps', 'Explore various deployment options for your Node.js applications.', 2);

-- Comments
INSERT INTO comments (content, author_id, post_id) VALUES
  ('Great article, I learned a lot!', 2, 1),
  ('Informative post, thanks for sharing.', 1, 2),
  ('This is really helpful, can''t wait to try it out.', 2, 2),
  ('Interesting, I''ll definitely check out the deployment options.', 1, 3),
  ('Awesome, I''ve been looking for something like this.', 2, 3);


  