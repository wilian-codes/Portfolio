import { createBrowserRouter } from 'react-router'
import { RootLayout } from './layouts/root-layout'
import { HomePage } from './routes/home'
import { NotFoundPage } from './routes/not-found'
import { ProjectPage } from './routes/project'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects/:slug', element: <ProjectPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
