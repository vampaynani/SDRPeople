import Modal from "@/components/modal";
import { PrismaClient } from "@prisma/client";
import type { Person } from "@prisma/client"; // Importing the Post type from the Prisma client library.
import { revalidatePath } from "next/cache";
import Link from "next/link";

const db = new PrismaClient();
async function fetchPeople(): Promise<Person[]> {
  // Function to fetch all posts from the database.
  return await db.person.findMany();
}

async function createPerson(personFields: FormData) {
  "use server";
  // Function to create a new post in the database.
  await db.person.create({
    data: {
      name: personFields.get("name")?.toString() ?? "",
      title: personFields.get("title")?.toString() ?? "",
      email: personFields.get("email")?.toString() ?? "",
    },
  });
  revalidatePath("/people", "page");
}

export default async function People() {
  const people = await fetchPeople();

  return (
    <main>
      <div className="button-container">
        <Link className="button" href="/people?modal=true">
          + Contact
        </Link>
      </div>
      <div className="qualified-profiles">
        <div className="qualified-profiles__header">
          <div className="qualified-profiles__header-cell">
            <label className="qualified-profile__check">
              <input type="checkbox" />
            </label>
            Name
          </div>
          <div className="qualified-profiles__header-cell">Organization</div>
          <div className="qualified-profiles__header-cell">Title</div>
          <div className="qualified-profiles__header-cell">Active Sequence</div>
          <div className="qualified-profiles__header-cell">Email</div>
          <div className="qualified-profiles__header-cell">Phone</div>
          <div className="qualified-profiles__header-cell">Location</div>
          <div className="qualified-profiles__header-cell">Twitter</div>
          <div className="qualified-profiles__header-cell">Linkedin</div>
        </div>
        {people.map((person) => {
          return (
            <div key={person.id} className="qualified-profile">
              <div className="qualified-profile__cell">
                <label className="qualified-profile__check">
                  <input type="checkbox" />
                </label>
                {person.name}
              </div>
              <div className="qualified-profile__cell">
                {person.organizationId}
              </div>
              <div className="qualified-profile__cell">{person.title}</div>
              <div className="qualified-profile__cell"></div>
              <div className="qualified-profile__cell">{person.email}</div>
              <div className="qualified-profile__cell">{person.phone}</div>
              <div className="qualified-profile__cell">{person.location}</div>
              <div className="qualified-profile__cell">{person.twitter}</div>
              <div className="qualified-profile__cell">{person.linkedin}</div>
            </div>
          );
        })}
      </div>
      <Modal createPerson={createPerson} />
    </main>
  );
}
