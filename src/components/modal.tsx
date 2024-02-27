"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function Modal({ createPerson }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");

  const onCreatePerson = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    createPerson(formData);
    router.push("/people");
  };
  return (
    <>
      {modal && (
        <div className="qualified-profile-modal">
          <form onSubmit={onCreatePerson}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="email" placeholder="Email" />
            <div className="qualified-profile-modal__actions">
              <Link href="/people">Cancel</Link>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Modal;
