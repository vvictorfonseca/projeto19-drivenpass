import { notes } from "@prisma/client";
import noteRepository from "../repositories/noteRepository.js";

export type CreateNoteData = Omit<notes, "id" | "createdAt">

async function createNote(note: CreateNoteData) {

    const info = await noteRepository.findNoteByTittle(note)

    console.log("note", info)

    if (info) {
        ("entrou")
        throw { type: "conflict", message: "already have a credential tittle with this name" }
    }
    
    return await noteRepository.createNote(note)
}

async  function allNotes(userId: number) {
    const notes = await noteRepository.allNotes(userId)

    if (notes.length == 0) {
        throw { type: "not_found", message: "no notes registered" }
    }

    return notes
}

async function findNoteById(infoId: number, userId: number) {
    const note = await noteRepository.findNoteByid(infoId, userId)

    if (note.length == 0) {
        throw { type: "not_found", message: "invalid note" }
    }

    return note
}

async function deleteNote(infoId: number, userId: number) {
    const note = await noteRepository.deleteNoteById(infoId, userId)

    if (!note) {
        throw { type: "not_found", message: "invalid note" }
    }

    return note
}

const noteService = {
    createNote,
    allNotes,
    findNoteById,
    deleteNote
}

export default noteService