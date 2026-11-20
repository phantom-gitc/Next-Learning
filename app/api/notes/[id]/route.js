import { connectDB } from "@/lib/database.js";
import { Note } from "@/lib/models/notes.model";

// GET request to fetch a single note by ID

export async function GET(request , { params }) {
    await connectDB();
    const { id } = await params;

    const note = await Note.findById(id).lean();

    if(!note) {
        return Response.json({message: "Note not found"} , {status: 404});
    }

    return Response.json(note , {status: 200});
}


// PUT request to update a note by ID 

export async function PUT(request , { params }) {
    await connectDB();
    const { id } = await params;
    const { title , content } = await request.json();

    const note = await Note.findByIdAndUpdate(id , { title , content } , { new: true });

    if(!note) {
        return Response.json({message: "Note not found"} , {status: 404});
    }

    return Response.json(note , {status: 200});
}


// DELETE request to delete a note by ID

export async function DELETE(request , { params }) {
    await connectDB();
    const { id } = await params;

    const note = await Note.findByIdAndDelete(id);

    if(!note) {
        return Response.json({message: "Note not found"} , {status: 404});
    }

    return Response.json({message: "Note deleted successfully"} , {status: 200});
}
