'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Editor from '@/components/Editor/Editor';

export default function DocPage() {
  const params = useParams();
  // params.id can be string or string[]
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) return null;

  return <Editor id={id} />;
}
