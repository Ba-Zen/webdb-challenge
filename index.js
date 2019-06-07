const express = require("express");
const knex = require("knex");

const server = express();

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

server.use(express.json());

server.get("/api/projects", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/actions", (req, res) => {
    db("actions")
      .then(action => {
        res.status(200).json(action);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

server.post("/api/projects", (req, res) => {
  db("projects")
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ err: "error adding project" });
    });
});

server.post("/api/actions", (req, res) => {
    db("actions")
      .insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        res.status(500).json({ err: "error adding action" });
      });
  });

  server.get('/api/projects/:id/actions', (req,res) => {
      const projectId = req.params.id;
      const id = req.params.id;
      db('projects')
      .where({ id: id })
      .first()
      .then(projects => {
        db('actions')
        .where({ project_id: projectId })
        .then(actions => {
            (projects.actions = actions)
            res.status(200).json(projects)
        })
      })
      
      .catch(err => {
        res.status(500).json({ err });
      });
  })

//   server.get('/api/projects/:id/actions', (req,res) => {
//     const projectId = req.params.id;
//     const id = req.params.id;
//     db('actions')
//     .where({ project_id: projectId })
//     .then(actions => {
//         res.status(200).json(actions)
//     })
//     .catch(err => {
//       res.status(500).json({ err });
//     });
// })


const port = process.env.PORT || 6000;
server.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
