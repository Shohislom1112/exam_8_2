import { useEffect, useState } from "react";
import axios from "axios";
import "./main.scss";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Actions, Loader, AddStudent } from "./../components";
import EditStudent from "../components/EditStudent";

const Students = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://65bb755f52189914b5bc33c8.mockapi.io/Images"
      );
      const data = await res.data;
      setStudents(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (student) => {
    setLoading(true);
    try {
      const { firstName, lastName, age, avatar } = student;
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("age", age);
      formData.append("avatar", avatar);

      await axios.post(
        "https://65bb755f52189914b5bc33c8.mockapi.io/Images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchStudents();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this student?`)) {
      try {
        await axios.delete(
          `https://65bb755f52189914b5bc33c8.mockapi.io/Images/${id}`
        );
        setStudents(students.filter((student) => student.id !== id));
        console.log(`${type} with ID ${id} deleted successfully.`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setOpenEdit(true);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      {openAdd && (
        <AddStudent
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          addStudent={addStudent}
          fetchStudents={fetchStudents}
        />
      )}
      {openEdit && (
        <EditStudent
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          selectedStudent={selectedStudent}
          fetchStudents={fetchStudents}
        />
      )}
      <Stack
        direction="row"
        sx={{
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Products
        
        
        
        
        
        
        
        </Typography>
        <input
          type="text"
          placeholder="Search"
          className="inputt"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add
        </Button>
      </Stack>

      {loading ? <Loader /> : null}
      {error ? (
        <Typography
          variant="h4"
          color="error"
          sx={{ textAlign: "center", paddingTop: "20px" }}
        >
          {error.message}
        </Typography>
      ) : null}
      {students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Sale</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .filter((student) => {
                  if (search === "") {
                    return student;
                  } else if (
                    student.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return student;
                  }
                })
                .map((student) => (
                  <TableRow
                    key={student.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {student.id}
                    </TableCell>
                    <TableCell>
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        src={student.image}
                        alt={student.name}
                      />
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.description}</TableCell>
                    <TableCell>{student.sale}</TableCell>
                    <TableCell>
                      <Actions
                        type="student"
                        data={student}
                        handleEdit={() => handleEdit(student)}
                        handleDelete={() =>
                          handleDelete("students", student.id)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
};

export default Students;
