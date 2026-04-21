import { RouterProvider } from 'react-router';
import { RoleProvider } from './contexts/RoleContext';
import { router } from './routes';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <RoleProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </RoleProvider>
  );
}