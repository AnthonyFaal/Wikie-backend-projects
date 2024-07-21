-- 1. Retrieve all posts with their authors and comments
SELECT posts.title, posts.content, users.username, comments.content AS comment_content
FROM posts
JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON comments.post_id = posts.id;

-- 2. Retrieve all comments for a specific post
SELECT comments.content, users.username
FROM comments
JOIN users ON comments.user_id = users.id
WHERE comments.post_id = 1;

-- 3. Retrieve all posts by a specific user
SELECT posts.title, posts.content
FROM posts
WHERE posts.user_id = 1;

-- 4. Count the number of comments on each post
SELECT posts.title, COUNT(comments.id) AS comment_count
FROM posts
LEFT JOIN comments ON comments.post_id = posts.id
