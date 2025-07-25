import React, { useState, useEffect } from "react";
import API from "../../../../utils/API";

const SectionTwoCategory = ({ categoryId, setActiveSection }) => {
  const [form, setForm] = useState({
    headline: "",
    file: null,
  });

  const [existingData, setExistingData] = useState(null); // existing record

  useEffect(() => {
    // fetch section two for this category on mount
    if (!categoryId) return;

    API.get(`/sectiontwo/category/${categoryId}`)
      .then((res) => {
        if (res.data.length > 0) {
          const data = res.data[0];
          setExistingData(data);
          setForm({
            headline: data.headline || "",
            file: null, // no file selected yet
          });
        }
      })
      .catch((err) => console.error("Error fetching section two:", err));
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      alert("Category ID is required");
      return;
    }

    const formData = new FormData();
    formData.append("headline", form.headline);
    formData.append("category_id", categoryId);

    // Append file if exists
    if (form.file) {
      formData.append("file", form.file);
    } else if (existingData) {
      // Pass old media file name if no new file selected (for update)
      formData.append("oldMediaFile", existingData.media_file);
    }

    try {
      if (existingData) {
        // Update existing record
        await API.put(`/sectiontwo/${existingData.id}`, formData);
        alert("Section Two updated successfully");
        setActiveSection(null);
      } else {
        // Create new record
        await API.post("/sectiontwo", formData);
        alert("Section Two added successfully");
        setActiveSection(null);
      }
    } catch (err) {
      console.error("Error saving section two:", err);
      alert("Failed to save section two");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mb-4">
      <h5 className="mb-3">Section Two: Upload Media with Headline</h5>

      <div className="mb-3">
        <label className="form-label">Headline</label>
        <input
          type="text"
          name="headline"
          value={form.headline}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter headline"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Upload Image or Video</label>
        <input
          type="file"
          name="file"
          accept="image/*,video/*"
          onChange={handleChange}
          className="form-control"
        />
        {/* Show current file name if editing and no new file selected */}
        {existingData && !form.file && (
          <small className="text-muted">
            Current file: {existingData.media_file}
          </small>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        {existingData ? "Update Section Two" : "Add Section Two"}
      </button>
    </form>
  );
};

export default SectionTwoCategory;
