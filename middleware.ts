import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import auth from "@/app/configs/auth"
import { jwtDecodeData } from './app/helpers';
 
export async function middleware(request: NextRequest) {
 
  const path = request.nextUrl.pathname;
  const token = request.cookies.get(auth.storageTokenKeyName)?.value; 
  const isPublicPath = path === "/login" || path === "/register" || path === "/" || path.startsWith('/urbancart') ;
  const authRole	= request.cookies.get(auth.storageRole)?.value;
  let getRole:any
  if(authRole){
    getRole = jwtDecodeData(authRole);
    
  }

  if(!isPublicPath && token === undefined ){
    return NextResponse.redirect(new URL('/urbancart', request.url))
  }

  if(path === "/" && !token ){
    return NextResponse.redirect(new URL('/urbancart', request.url))
  }


  if(isPublicPath && token){
    if(isPublicPath  && token && getRole === "admin" ){
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  
    if(isPublicPath && token && getRole === "user"){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }  

  }else if(!isPublicPath && token){
    if(path.startsWith("/admin") && token && getRole==="user"){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }else if(path.startsWith("/dashboard") && token && getRole==="admin"){
      return NextResponse.redirect(new URL('/admin', request.url))
    }

  }

}

export const config = {
  matcher: [
        '/' ,
        '/urbancart',
        '/login',
        '/register',
        '/admin/:path*',
        '/dashboard/:path*',
        '/urbancart/:path*'
    ],
}
