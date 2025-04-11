import express from 'express';
import { prismaClient } from 'db1'


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// POST: Create a new mentor
app.post("/ment", async (req, res): Promise<any> => {
  try {
    const {
      name,
      about,
      mentorship,
      qualification,
      bio,
      experience,
    } = req.body;

    if (!name || !about || !mentorship || !qualification || !bio || !experience) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const mentor = await prismaClient.mentor.create({
      data: {
        name,
        about,
        mentorship,
        qualification,
        bio,
        experience,
      },
    });

    res.status(201).json({ message: "Mentor created", mentor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: All mentors (short info)
app.get("/mentor", async (req, res) => {
  try {
    const mentors = await prismaClient.mentor.findMany({
      select: {
        id: true,
        name: true,
        about: true,
        mentorship: true,
      },
    });

    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Full mentor details
app.get("/mentor/:id", async (req, res): Promise<any> => {
  try {
    const mentor = await prismaClient.mentor.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.json(mentor);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT: Update mentor
app.put("/mentor/:id", async (req, res) => {
  try {
    const updated = await prismaClient.mentor.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    res.json({ message: "Mentor updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Update failed or mentor not found" });
  }
});

// DELETE: Remove mentor
app.delete("/mentor/:id", async (req, res) => {
  try {
    await prismaClient.mentor.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: "Mentor deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed or mentor not found" });
  }
});

// Server start
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});