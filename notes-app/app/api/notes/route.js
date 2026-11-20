
import { connectDB } from "@/lib/database.js";
import { Note } from "@/lib/models/notes.model";

// GET request to fetch all notes 

export async function GET() {
    await connectDB();
    const notes = await Note.find().sort({createdAt: -1}).lean();
    return Response.json(notes , {status: 200});
}


// POST request to create a new note 

export async function POST(request) {

    await connectDB();
    const {title , content} = await request.json();

    const note = await Note.create({title , content});

    return Response.json(note , {status: 201});
    
}

