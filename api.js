const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 2,
  },
];

const http = require("http");

const server = http.createServer();

const simpleApi = (request, response) => {
  if (request.method === "POST" && request.url === "/users") {
    let body = "";
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      const user = JSON.parse(body);

      users.push({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      });

      response.writeHead(200, { "Content-Type": "application/json" }); // (4)
      response.end(JSON.stringify({ users: users }));
    });
  } else if (request.method === "POST" && request.url === "/posts") {
    let line = "";
    request.on("data", (data) => {
      line += data;
    });
    request.on("end", () => {
      const post = JSON.parse(line);

      posts.push({
        id: post.id,
        title: post.title,
        content: post.content,
        userId: post.userId,
      });
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ posts: posts }));
    });
  } else if (request.method === "GET" && request.url === "/users-posts") {
    const postArray = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < posts.length; j++) {
        if (users[i].id === posts[j].userId) {
          postArray.push({
            userId: users[i].id,
            userName: users[i].name,
            postingId: posts[j].id,
            postingTitle: posts[j].title,
            postingContent: posts[j].content,
          });
        }
      }
    }
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ posts: postArray }));
  }
};

server.on("request", simpleApi);

server.listen(8000, "127.0.0.1", function () {
  console.log("Listening to request on port 8000");
});
