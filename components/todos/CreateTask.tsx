import { useState } from "react";

// project-imports
import StyledButton from "../Common/UI/StyledButton";
import CreateTaskModal from "./CreateTaskModal";

// <<===============|| CUSTOM TAB PANEL ||===============>>

export default function CreateTask() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledButton variant="contained" onClick={() => setOpen(true)}>
        <span className="text-xl mr-2">+</span> New Task
      </StyledButton>
      <CreateTaskModal open={open} setOpen={setOpen} />
    </>
  );
}
