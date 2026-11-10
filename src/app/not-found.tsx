import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { StudioCharacter } from '@/components/common/StudioCharacter';

export default function NotFound() {
  return <><Navbar /><main className="container section-spacing" style={{ textAlign: 'center' }}>
    <span className="studio-eyebrow">404 / A little detour</span>
    <h1 className="studio-title">This page slipped away.</h1>
    <StudioCharacter character="curiosity" />
    <p style={{ margin: '1.5rem auto 2rem', color: 'var(--fg-secondary)' }}>Let’s get you back to the good stuff.</p>
    <Link href="/" className="btn-primary">Back to home ↗</Link>
  </main><Footer /></>;
}
