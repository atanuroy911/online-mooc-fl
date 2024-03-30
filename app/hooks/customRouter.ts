// hooks/useCustomRouter.ts
import { useRouter as useNextRouter } from 'next/navigation';

export const useRouter = () => {
  const router = useNextRouter();

  if (!router) {
    throw new Error('NextRouter was not found');
  }

  return router;
};
