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

  const handleChangeEdit = (e) => {
    setEditForm({
      ...editForm, [e.target.name]: e.target.value
    })
  }

  //create
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...form, age: Number(form.age)})
      })
      setForm(initialForm)
      const additional = students.map((s)=> s._id !== id) 
      setStudents(additional)
    } catch (error) {
      console.log(error)
    }
  }

  //edit
  const handleEdit = (student) => {
    setEditingId(student._id)
    setEditForm(student)
  }

  //save
  const handleSubmitEdit = (e) => {
    e.preventDefault()

    try {
      fetch(`http://localhost:5000/students/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...editForm, age: Number(form.age)})
      })
      // setEditForm(initialForm)
    } catch (error) {
      console.log(error)
    }
  }

  //delete
  const handleDelete = async(id) => {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE"
    })

    const remaining = students.filter((s)=> s._id !== id) 
    setStudents(remaining)
  }
  

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
        <input type="number" value={form.age} required onChange={handleChange} name="age" placeholder="Enter your Age"></input>
        <br></br>
        <br></br>

        <button type="submit">Submit</button>
      </form>

      <br></br>
      <h2>List of Students</h2>
       {students.map((student) => editingId === student._id ? (
        <div key={student._id}>
          <label>Name: </label>
          <input type="text" onChange={handleChangeEdit} name="name" value={editForm.name}></input>
          <label>Course: </label>
          <input type="text" onChange={handleChangeEdit} name="course" value={editForm.course}></input>
          <label>Age: </label>
          <input type="text" onChange={handleChangeEdit} name="age" value={editForm.age}></input>
          <button onClick={() => handleSubmitEdit(student._id)}>Save</button>
        </div>
       ) : (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <button onClick={() => handleEdit(student)}>Edit</button>
          <button onClick={() => handleDelete(student._id)}>Delete</button>
        </div>
       ))}
    </div>
  )
}

export default App
