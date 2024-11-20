import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
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

  // refreshing the auth token
  await supabase.auth.getUser();

<<<<<<< HEAD
		// protected routes
		// if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
		// 	return NextResponse.redirect(new URL("/sign-in", request.url));
		// }

		if (request.nextUrl.pathname === "/" && !user.error) {
			return NextResponse.redirect(new URL("//", request.url));
		}

		return response;
	} catch (e) {
		// If you are here, a Supabase client could not be created!
		// This is likely because you have not set up environment variables.
		// Check out http://localhost:3000 for Next Steps.
		return NextResponse.next({
			request: {
				headers: request.headers,
			},
		});
	}
};
=======
  return supabaseResponse;
}
>>>>>>> 9c0b93ef198e6e853e954ec2cfbbc33641daa190
