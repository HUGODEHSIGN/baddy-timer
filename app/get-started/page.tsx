import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Heading>I am a...</Heading>
        <div className="flex flex-col gap-2">
          <Button asChild>
            <Link href="/get-started/player">Player</Link>
          </Button>
          <Button asChild>
            <Link href="/get-started/admin">Admin</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
