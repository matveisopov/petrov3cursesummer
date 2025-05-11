import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Список дат для оценок (можно расширять)
const LESSONS = [
  { date: "23.10.2023", time: "15:10-16:30" },
  { date: "30.10.2023", time: "17:20-18:50" },
  { date: "06.11.2023", time: "15:10-16:30" },
  { date: "13.11.2023", time: "17:20-18:50" },
  { date: "20.11.2023", time: "15:10-16:30" },
];

function App() {
  return (
    <BrowserRouter>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Журнал</Link>
          <Link to="/about" style={styles.link}>О приложении</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Journal />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function About() {
  return (
    <div style={styles.card}>
      <h2>О приложении</h2>
      <p>Это пример электронного журнала для группы на React с возможностью добавления, удаления, выделения учеников, фильтрации и выставления оценок по датам.</p>
    </div>
  );
}

function Journal() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Яйкаров Тимур",
      grades: {},
    },
    {
      id: 2,
      name: "Штайн Владислав",
      grades: {},
    },
    {
      id: 3,
      name: "Чугунов Михаил",
      grades: {},
    },
    {
      id: 4,
      name: "Цыбулькин Максим",
      grades: {},
    },
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");

  // Фильтрация по ФИО
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Добавление ученика
  function addStudent(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setStudents([
      ...students,
      { id: Date.now(), name: newName, grades: {} },
    ]);
    setNewName("");
  }

  // Удаление ученика
  function deleteStudent(id) {
    setStudents(students.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  // Добавление/изменение оценки
  function setGrade(studentId, lessonIdx, value) {
    setStudents(
      students.map((s) =>
        s.id === studentId
          ? {
              ...s,
              grades: { ...s.grades, [lessonIdx]: value },
            }
          : s
      )
    );
  }

  return (
    <div style={styles.card}>
      <h2 style={{ marginBottom: 20 }}>Журнал группы</h2>
      <form onSubmit={addStudent} style={styles.form}>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="ФИО"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Добавить</button>
      </form>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Фильтр по ФИО"
        style={styles.input}
      />
      <div style={{ overflowX: "auto", marginTop: 20 }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>№</th>
              <th style={styles.th}>ФИО</th>
              {LESSONS.map((lesson, idx) => (
                <th key={idx} style={styles.th}>
                  <div>{lesson.date}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{lesson.time}</div>
                </th>
              ))}
              <th style={styles.th}>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, idx) => (
              <tr
                key={student.id}
                style={
                  selectedId === student.id
                    ? { ...styles.tr, ...styles.selected }
                    : styles.tr
                }
                onClick={() => setSelectedId(student.id)}
              >
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>{student.name}</td>
                {LESSONS.map((_, lessonIdx) => (
                  <td style={styles.td} key={lessonIdx}>
                    <input
                      type="text"
                      value={student.grades[lessonIdx] || ""}
                      onChange={(e) =>
                        setGrade(student.id, lessonIdx, e.target.value)
                      }
                      style={styles.gradeInput}
                      maxLength={2}
                      onClick={e => e.stopPropagation()}
                      placeholder="—"
                    />
                  </td>
                ))}
                <td style={styles.td}>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      deleteStudent(student.id);
                    }}
                    style={styles.deleteButton}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={LESSONS.length + 3} style={styles.tdEmpty}>
                  Нет учеников
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Стили
const styles = {
  container: {
    fontFamily: "Segoe UI, Arial, sans-serif",
    background: "#f6f8fa",
    minHeight: "100vh",
    padding: 0,
    margin: 0,
  },
  nav: {
    background: "#2d3a4b",
    padding: "12px 24px",
    marginBottom: 30,
    display: "flex",
    gap: 20,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: 18,
  },
  card: {
    background: "#fff",
    maxWidth: 1100,
    margin: "0 auto",
    padding: 32,
    borderRadius: 12,
    boxShadow: "0 2px 12px #0001",
  },
  form: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },
  input: {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #bbb",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    padding: "8px 18px",
    borderRadius: 6,
    border: "none",
    background: "#2d3a4b",
    color: "#fff",
    fontWeight: 500,
    cursor: "pointer",
    fontSize: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 700,
    background: "#fff",
  },
  th: {
    background: "#e9eef3",
    padding: "10px 6px",
    border: "1px solid #d1d5db",
    fontWeight: 600,
    textAlign: "center",
    fontSize: 15,
  },
  tr: {
    transition: "background 0.2s",
    cursor: "pointer",
  },
  selected: {
    background: "#f0f7ff",
  },
  td: {
    border: "1px solid #d1d5db",
    padding: "8px 6px",
    textAlign: "center",
    fontSize: 15,
  },
  tdEmpty: {
    padding: 20,
    color: "#888",
    textAlign: "center",
    fontSize: 16,
    background: "#f9fafb",
  },
  gradeInput: {
    width: 32,
    padding: "4px 2px",
    borderRadius: 4,
    border: "1px solid #bbb",
    textAlign: "center",
    fontSize: 15,
    outline: "none",
  },
  deleteButton: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "4px 10px",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
    transition: "background 0.2s",
  },
};

export default App;