import React, { createContext, useContext } from "react";
import useSWR, { mutate } from "swr";

const NotesContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json());

export const NotesProvider = ({ children }) => {
  const [userId, setUserId] = React.useState(null);

  const { data: notes = [], error } = useSWR(
    userId ? `http://192.168.10.5:5000/api/users/${userId}/notes` : null,
    fetcher
  );

  const fetchUserNotes = async (storedUserId) => {
    setUserId(storedUserId);
  };

  const addNote = async (newNote) => {
    await fetch(`http://192.168.10.5:5000/api/users/${userId}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    mutate(`http://192.168.10.5:5000/api/users/${userId}/notes`);
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
