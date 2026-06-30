import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/service.config";

export function SignupPatientPage() {
  const navigate = useNavigate();

  const [specialistneeded, setSpecialistneeded] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [languages, setLanguages] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      formData.append("role", "patient");
      formData.append("specialistneeded", specialistneeded);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("document", documentFile);

      await service.post("/users/patient", formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.errorMessage ||
          error.response?.data?.error ||
          "Signup failed",
      );
    }
  };

  return (
    <div>
      <h1>Sign up — Patient</h1>
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
        <label>Specialist needed:</label>
        <input
          type="text"
          value={specialistneeded}
          onChange={(e) => setSpecialistneeded(e.target.value)}
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

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Photo:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <label>Document:</label>
        <input
          type="file"
          onChange={(e) => setDocumentFile(e.target.files[0])}
        />

        <button type="submit">Sign up</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}
