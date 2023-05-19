import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savinNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

// thunks es cuando tengo que despachar tareas asincronas para el reducer
export const startNewNote = () => {

    return async (dispatch, getstate) => {

        dispatch(savinNewNote());

        //uid
        const { uid } = getstate().auth;

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;


        // dispach
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = () => {

    return async (dispatch, getstate) => {

        const { uid } = getstate().auth;
        if (!uid) throw new Error(' EL UID DEL USUARIO NO EXISTE');

        const notes = await loadNotes(uid)
        dispatch(setNotes(notes));
    }

}

export const startSaveNote = () => {
    return async (dispatch, getstate) => {

        dispatch(setSaving())

        const { uid } = getstate().auth;
        const { active: note } = getstate().journal;

        const noteToFiresStore = { ...note };
        delete noteToFiresStore.id;
        console.log(noteToFiresStore)

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFiresStore, { merge: true })

        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {

    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () =>{
    return async(dispach, getState) =>{

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid } /journal/notes/${note.id}`);
        const resp = await deleteDoc( docRef);

        dispach( deleteNoteById(note.id));

    }
}