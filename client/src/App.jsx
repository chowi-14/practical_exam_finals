import axios from "axios"
import { useEffect, useState } from "react"

const initialForm = {
  name: "",
  course: "",
  age: ""
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState()
  const [editingId, setEditingId] = useState()
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState()
  
  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data)
      })
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  //create
  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...form, age: Number(form.age)})
      })
      setForm(initialForm)
    } catch (error) {
      console.log(error)
    }
  }

  //edit
  const handleEdit = (student) => {
    setIsEditing(true)
  }

  //delete

  return (
    <div>
      <h1>Student Management System</h1>
      <h2>Add Students</h2>

      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" required onChange={handleChange} name="name" value={form.name} placeholder="Enter your Name"></input>
        <br></br>
        <br></br>

        <label>Course: </label>
        <input type="text" value={form.course} required onChange={handleChange} name="course" placeholder="Enter your Course"></input>
        <br></br>
        <br></br>

        <label>Age:</label>
        <input type="text" value={form.age} required onChange={handleChange} name="age" placeholder="Enter your Age"></input>
        <br></br>
        <br></br>

        <button type="submit">Submit</button>
      </form>

      <br></br>
      <h2>List of Students</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student => (
              <tr key={student._i}>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.age}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            )))

            }
           
          </tbody>
        </table>
    </div>
  )
}

export default App
