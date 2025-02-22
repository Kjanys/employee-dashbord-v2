'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {ThemeProvider} from '@gravity-ui/uikit';

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useSelector((state: RootState) => state.theme);

  return <ThemeProvider theme={theme as string}>{children}</ThemeProvider>;
}