const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories)

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndexID = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndexID < 0){
      return response.status(400).json({ error: "project not found"})
  }

  const repository = {
    id, title, url, techs, likes: repositories[repositoryIndexID].likes
  }

  repositories[repositoryIndexID] = repository

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndexID = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndexID < 0) {
    return response.status(400).json({ error: "Repository not found!"})
  }

  repositories.splice(repositoryIndexID, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id)
  const repositoryIndexID = repositories.findIndex(repository => repository.id === 'uuid2')

  if (repository) {
    repository.likes += 1
    repositories[repositoryIndexID] = repository
  }
  else{
    return response.status(400).json({ error: "Repository not found!"})
  }

  return response.json(repository)

});

module.exports = app;
