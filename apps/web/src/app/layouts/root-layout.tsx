import { Outlet, ScrollRestoration } from 'react-router'

export function RootLayout() {
  return (
    <>
      <main id="main" className="min-h-dvh">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  )
}
