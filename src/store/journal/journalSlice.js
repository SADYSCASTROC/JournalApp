import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active:{
        //     id:'ABC123',
        //     title:'',
        //     body:'',
        //     date:1234,
        //     imageUrls:[], // thtpas://foto1.pg,thtpas://foto1.pg
        // },
    },
    reducers: {

        savinNewNote: (state) => {
            state.isSaving = true;
        },

        addNewEmptyNote: (state, action) => {
            // todo lo que se coloca en los reducer tiene que ser  trabajos sincronos
            state.notes.push(action.payload);
            state.isSaving = false;

        },

        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },

        setNotes: (state, action) => {
            state.notes = action.payload;
        },

        setSaving: (state) => {

        },

        updateNote: (state, action) => {

        },

        deleteNoteById: (state, action) => {
            // todo lo que se coloca en los reducer tiene que ser  trabajos sincronos

        },

    }
});

// Action creators are generated for each case reducer function
export const {savinNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions;