import { Database } from '@/types/supabase';
import { createServerClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (validateUser(user, request)) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (!user) {
    return supabaseResponse;
  }

  const { data: primaryPlayer } = await supabase
    .from('player')
    .select()
    .eq('user_id', user?.id)
    .eq('primary', true)
    .maybeSingle();

  if (validatePlayer(primaryPlayer, request)) {
    const url = request.nextUrl.clone();
    url.pathname = '/get-started';
    return NextResponse.redirect(url);
  }
  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}

function validateUser(user: User | null, request: NextRequest) {
  return (
    !user &&
    !request.nextUrl.pathname.endsWith('/') &&
    !request.nextUrl.pathname.endsWith('/signup') &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  );
}

type PrimaryPlayer = Database['public']['Tables']['player']['Row'];

function validatePlayer(
  primaryPlayer: PrimaryPlayer | null,
  request: NextRequest
) {
  return (
    !primaryPlayer &&
    !request.nextUrl.pathname.endsWith('/') &&
    !request.nextUrl.pathname.startsWith('/get-started')
  );
}
