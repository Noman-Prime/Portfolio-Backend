import Project from "./Model.js";
import cloudinary from "../Cloudinary.js";

// CREATE
export const createProject = async (req, res) => {
  try {
    const { name, description, link } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image required" });

    const result = await cloudinary.uploader.upload_stream(
      { folder: "portfolio" },
      async (err, uploaded) => {
        if (err) return res.status(500).json({ err });

        const project = new Project({
          name,
          description,
          link,
          image: uploaded.secure_url,
        });

        await project.save();
        res.status(201).json(project);
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// READ ALL
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// READ SINGLE
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// UPDATE
export const updateProject = async (req, res) => {
  try {
    const { name, description, link } = req.body;
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "portfolio" },
        async (err, uploaded) => {
          if (err) return res.status(500).json({ err });

          project.name = name || project.name;
          project.description = description || project.description;
          project.link = link || project.link;
          project.image = uploaded.secure_url;

          await project.save();
          res.status(200).json(project);
        }
      );
      result.end(req.file.buffer);
    } else {
      project.name = name || project.name;
      project.description = description || project.description;
      project.link = link || project.link;

      await project.save();
      res.status(200).json(project);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};