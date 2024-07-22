import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <header className="bg-primary text-primary-foreground p-4 absolute left-0 top-0 right-0">
        <div className="text-xl font-bold">Bad Time</div>
      </header>
      <main className="flex justify-center items-center h-screen mx-4">
        {children}
      </main>
    </div>
  );
}
