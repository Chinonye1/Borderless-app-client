import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/service.config";

export function SignupPhysicianPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [languages, setLanguages] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [consultfee, setConsultfee] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await service.get("/departments");
        setDepartmentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDepartments();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fullname", fullname);
      formData.append("country", country);
      formData.append("age", age);
      formData.append("languages", languages);
      formData.append("specialty", specialty);
      formData.append("consultfee", consultfee);
      formData.append("department", department);
      formData.append("image", image);

      await service.post("/users/physician", formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Sign up — Physician</h1>
      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Full name:</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Specialty:</label>
        <input
          type="text"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />

        <label>Languages:</label>
        <input
          type="text"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
        />

        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>Consultation fee:</label>
        <input
          type="number"
          value={consultfee}
          onChange={(e) => setConsultfee(e.target.value)}
        />

        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <label>Department:</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">-- choose department --</option>
          {departmentList.map((element) => (
            <option key={element._id} value={element._id}>
              {element.name}
            </option>
          ))}
        </select>

        <button type="submit">Sign up</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}
