import axios from "axios"
import { useEffect, useState } from "react"

const initialForm = {
  name: "",
  course: "",
  age: ""
}

function App() {
  // const [students, setStudents] = useState([])
  const [form, setForm] = useState(initialForm)

  // useEffect(() => {
  //   axios.get("http://localhost:5000/students")
  //     .then((response) => {
  //       setStudents(response.data)
  //     })
  // }, [])

  const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

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

    </div>
  )
}

export default App
