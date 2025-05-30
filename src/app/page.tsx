import React from 'react';
import { ModeToggle } from './components/ModeToggle';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileInput } from '../components/ui/file-input';
import { SearchInput } from '@/components/ui/seach-input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const x = "hello world";



  console.log(x);


  return (
    <div className='dark:bg-gray-900 bg-white min-h-screen flex flex-col gap-5 items-center justify-center'>
      <div className="text-soft-pink-900 dark:text-soft-pink-300 text-2xl mb-4">Welcome to the Student Page</div>
      <div className="flex flex-col gap-5">

        <Badge >xxx</Badge>

        <ModeToggle />
      </div>
    </div>
  );
}
