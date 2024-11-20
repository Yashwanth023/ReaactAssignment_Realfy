// frontend/script.js
const API_URL = 'http://localhost:3000/api';

function App() {
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: '', email: '', age: '', weight: '', height: '', healthGoals: ''
  });
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `${API_URL}/users/${currentUser.id}` : `${API_URL}/users`;
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentUser)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      setCurrentUser({ name: '', email: '', age: '', weight: '', height: '', healthGoals: '' });
      setIsEditing(false);
      fetchUsers();
    } catch (error) {
      console.error('Error submitting user:', error);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <h1>Health Profile Manager</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          value={currentUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={currentUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="number"
          name="age"
          value={currentUser.age}
          onChange={handleInputChange}
          placeholder="Age"
          required
        />
        <input
          type="number"
          name="weight"
          value={currentUser.weight}
          onChange={handleInputChange}
          placeholder="Weight (kg)"
          required
        />
        <input
          type="number"
          name="height"
          value={currentUser.height}
          onChange={handleInputChange}
          placeholder="Height (cm)"
          required
        />
        <textarea
          name="healthGoals"
          value={currentUser.healthGoals}
          onChange={handleInputChange}
          placeholder="Health Goals"
          required
        ></textarea>
        <button type="submit">{isEditing ? 'Update' : 'Add'} User</button>
      </form>
      <div className="user-list">
        <h2>User Profiles</h2>
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Weight: {user.weight} kg</p>
            <p>Height: {user.height} cm</p>
            <p>Health Goals: {user.healthGoals}</p>
            <div className="user-actions">
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));