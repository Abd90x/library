import { auth } from "@/auth";
import Header from "@/components/header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  after(async () => {
    if (!session?.user?.id) return;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    // Update the last activity date of the user
    await db
      .update(users)
      .set({
        lastActivityDate: new Date().toISOString().slice(0, 10),
      })
      .where(eq(users.id, session.user.id));
  });

  return (
    <main className="root-container">
      <Header session={session} />
      <div className="mx-auto max-w-7xl">
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
