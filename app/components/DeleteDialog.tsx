import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

interface Props {
  handleDelete: (id: number) => void;
  id: number;
  isDeleting: boolean;
  warningMessage?: string;
}

const DeleteDialog = ({
  handleDelete,
  id,
  isDeleting,
  warningMessage = "Are you sure you want to Delete?",
}: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  // Close modal
  const handleClose = () => {
    setDialogOpen(false);
  };
  // const handleShow = async () => {
  //   setDialogOpen(true);
  // };

  return (
    <>
      <Dialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger>
          <IconButton className="!bg-transparent hover:bg-gray-200">
            <FaRegTrashCan className="text-red-500" />
          </IconButton>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title className="sr-only">Edit profile</Dialog.Title>
          <Dialog.Description size="2" mb="4" align="center">
            {warningMessage}
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="center">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              onClick={() => {
                handleDelete(id);
                handleClose();
              }}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default DeleteDialog;
