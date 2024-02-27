"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function ModalContent({ createPerson }: { createPerson: Function }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");

  const onCreatePerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    createPerson(formData);
  };
  return (
    <Suspense>
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
    </Suspense>
  );
}

function Modal({ createPerson }: { createPerson: Function }) {
  return (
    <Suspense>
      <ModalContent createPerson={createPerson} />
    </Suspense>
  );
}

export default Modal;
