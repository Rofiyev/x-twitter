import { ChangeEvent, useCallback, useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEditModal } from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from "../modal";
import Input from "../input";
import Textarea from "../textarea";
import ImageUpload from "../image-upload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [currentUser]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        username,
        name,
        coverImage,
        profileImage,
        bio,
      });
      mutateFetchedUser();
      toast.success("Updated successfully!");

      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [
    username,
    name,
    coverImage,
    profileImage,
    bio,
    mutateFetchedUser,
    editModal,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
          setName(value)
        }
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
          setUsername(value)
        }
        value={username}
        disabled={isLoading}
      />
      <Textarea
        placeholder="Bio"
        onChange={({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) =>
          setBio(value)
        }
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
