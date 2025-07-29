import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import React, { useEffect, useState } from 'react';
import "./app.css";
// Allowing for use of links
import { Link } from 'react-router-dom';
import MonkeyAndRiverLogo1 from 'Images/MonkeyAndRiverLogo1.png';
// Importing the login form
import Login from "./routes/Login";
import { useNavigate } from 'react-router-dom';
import Dashboard from "./routes/Dashboard";
import { createClient } from '@supabase/supabase-js';
//import { i } from "node_modules/@react-router/dev/dist/routes-DHIOx0R9";

// Supabase client setup
const supabaseUrl = "https://vwiefjfsokkzgjgswsvj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3aWVmamZzb2tremdqZ3N3c3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODgxNjksImV4cCI6MjA2OTM2NDE2OX0.HgjuGLBQ_gBf7tBPe_ee8_nUjuHFkh6vNA2lBk999dM";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

//const navigate = useNavigate(); // Initialize useNavigate

async function checkSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoggedIn = !!session;
  console.log("Is Logged In:", isLoggedIn);

  return isLoggedIn;
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);

      // Listen to auth state changes
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsLoggedIn(!!session);
      });

      return () => {
        listener?.subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  const handleStartBtn = async () => {
    if (isLoggedIn) {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      navigate('/'); // optional: redirect to home
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <header className="TopBar">
        <div className="NameContainer">
          <img id="Logo" src={MonkeyAndRiverLogo1} alt="WebImage" />
          <h1 id="AppName">CureNet</h1>
        </div>
        <nav className="Navigation">
          <Link className="NavLink" to="/dashboard">Dashboard</Link>
          <Link className="NavLink" to="/diagnose">Diagnose</Link>
          <Link className="NavLink" to="/profile">Profile</Link>
          <Link className="NavLink" to="/About">About</Link>
          <button className="NavLink" id="LoginBtn" onClick={handleStartBtn}>
            {isLoggedIn ? 'Logout' : 'Start'}
          </button>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
// function to render the login/signUp form
function handleLoginBtn(){
  return(
    <Login />
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
