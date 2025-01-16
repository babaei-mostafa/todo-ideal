import Modal from '../Common/Modal'

interface Props {
  open: boolean
  setOpen: (state: boolean) => void
}

export default function CreateTaskModal({ open, setOpen }: Props) {
  return (
    <Modal open={open} setOpen={setOpen} title="create task">
      <>Test</>
    </Modal>
  )
}
