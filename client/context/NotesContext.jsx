import React, { createContext, useContext } from "react";
import useSWR, { mutate } from "swr"; // Import mutate
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotesContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json());

export const NotesProvider = ({ children }) => {
  const [userId, setUserId] = React.useState(null);

  // SWR hook to fetch user notes
  const { data: notes = [], error } = useSWR(
    userId ? `http://192.168.10.2:5000/api/users/${userId}/notes` : null,
    fetcher
  );

  const fetchUserNotes = async (storedUserId) => {
    setUserId(storedUserId);
  };

  const addNote = async (newNote) => {
    // API call to add a new note
    await fetch(`http://192.168.10.2:5000/api/users/${userId}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    // After adding the note, mutate the SWR cache
    mutate(`http://192.168.10.2:5000/api/users/${userId}/notes`);
  };

  return (
    <NotesContext.Provider value={{ notes, fetchUserNotes, addNote, error }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};
