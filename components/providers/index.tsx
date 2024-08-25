import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import EditModal from "../modals/edit-modal";
import LoginModal from "../modals/login-modal";
import RegisterModal from "../modals/register-modal";
import PostCreateModal from "../modals/post-create-modal";
import PostEditModal from "../modals/post-edit-modal";

interface Props {
  children: ReactNode;
  session: any;
}

const Providers: FC<Props> = ({ children, session }) => {
  return (
    <>
      <SessionProvider session={session}>
        <Toaster />
        <EditModal />
        <LoginModal />
        <RegisterModal />
        <PostCreateModal />
        <PostEditModal />
        {children}
      </SessionProvider>
    </>
  );
};

export default Providers;
