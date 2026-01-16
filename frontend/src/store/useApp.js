import { create } from "zustand";

const useApp = create((set) => ({
    theme: localStorage.getItem("theme") || "theme",
    setTheme: (theme) => {
        localStorage.setItem("theme", theme)
        set({ theme })
    }
}))

export default useApp;