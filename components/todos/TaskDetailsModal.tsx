import Modal from '../Common/Modal'

interface Props {
  open: boolean
  setOpen: (state: boolean) => void
}

export default function TaskDetailsModal({ open, setOpen }: Props) {
  return (
    <Modal open={open} setOpen={setOpen} title="task details">
      <>details</>
    </Modal>
  )
}
