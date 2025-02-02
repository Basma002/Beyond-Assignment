// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/login'); // Redirects to the login page
  return null; // This prevents any additional rendering
}
