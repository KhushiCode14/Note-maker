import Note from "../Models/NoteModel.js";

const CreateNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not found, unauthorized" });
    }

    let newNote = new Note({ title, description, userId: user._id });

    await newNote.save(); // Save the document first

    // Populate the user details after saving
    newNote = await Note.findById(newNote._id).populate("userId", "-password");

    res.status(201).json(newNote); // ✅ Only one response
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { CreateNote };
