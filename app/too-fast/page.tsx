import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <Image
        src="/images/dog.png"
        alt="Dog"
        width={200}
        height={200}
        className="max-w-full"
      />
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100 text-center">
        Whoa, Slow Down There, Speedy!
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        It seems like you’re trying to access a page that’s not quite ready for
        prime time. We’re working hard to get everything up and running, so
        please check back soon!
      </p>
    </main>
  );
};

export default Page;
