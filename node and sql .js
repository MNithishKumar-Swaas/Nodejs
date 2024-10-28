const mysql = require('mysql2');
const http = require('http');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'k'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

const handleResponse = (res, statusCode, message) => {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.end(message);
};

const handleAddTask = (description, res) => {
  db.query('INSERT INTO tasks (description) VALUES (?)', [description], (err) => {
    if (err) {
      handleResponse(res, 500, 'Error adding task.');
      return;
    }
    handleResponse(res, 200, 'Task added successfully.');
  });
};

const handleCompleteTask = (id, res) => {
  db.query('UPDATE tasks SET completed = TRUE WHERE id = ?', [id], (err) => {
    if (err) {
      handleResponse(res, 500, 'Error marking task as completed.');
      return;
    }
    handleResponse(res, 200, 'Task marked as completed.');
  });
};

const handleUpdateTask = (id, description, res) => {
  db.query('UPDATE tasks SET description = ? WHERE id = ?', [description, id], (err) => {
    if (err) {
      handleResponse(res, 500, 'Error updating task.');
      return;
    }
    handleResponse(res, 200, 'Task updated successfully.');
  });
};

const handleAddComment = (id, comment, res) => {
  db.query('UPDATE tasks SET comment = ? WHERE id = ?', [comment, id], (err) => {
    if (err) {
      handleResponse(res, 500, 'Error adding comment.');
      return;
    }
    handleResponse(res, 200, 'Comment added successfully.');
  });
};

const handleDeleteTask = (id, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      handleResponse(res, 500, 'Error deleting task.');
      return;
    }
    handleResponse(res, 200, 'Task deleted successfully.');
  });
};

const handleViewTasks = (res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end('Error fetching tasks.');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
  });
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  const method = req.method;

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const data = body ? JSON.parse(body) : {};

    switch (true) {
      case (path === '/viewtasks' && method === 'GET'):
        handleViewTasks(res);
        break;

      case (path === '/addtask' && method === 'POST'):
        if (data.description) {
          handleAddTask(data.description, res);
        } else {
          handleResponse(res, 400, 'Description is required to add a task.');
        }
        break;

      case (path === '/completetask' && method === 'PUT'):
        if (data.id) {
          handleCompleteTask(data.id, res);
        } else {
          handleResponse(res, 400, 'ID is required to complete a task.');
        }
        break;

      case (path === '/updatetask' && method === 'PATCH'):
        if (data.id && data.description) {
          handleUpdateTask(data.id, data.description, res);
        } else {
          handleResponse(res, 400, 'ID and description are required to update a task.');
        }
        break;

      case (path === '/addcomment' && method === 'POST'):
        if (data.id && data.comment) {
          handleAddComment(data.id, data.comment, res);
        } else {
          handleResponse(res, 400, 'ID and comment are required to add a comment.');
        }
        break;

      case (path === '/deletetask' && method === 'DELETE'):
        if (data.id) {
          handleDeleteTask(data.id, res);
        } else {
          handleResponse(res, 400, 'ID is required to delete a task.');
        }
        break;

      default:
        handleResponse(res, 404, 'Not Found');
        break;
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
