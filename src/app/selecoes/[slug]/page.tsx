import { initialCategories } from '@/data/categories';
import SelecaoSlugClient from './client';

export function generateStaticParams() {
  return initialCategories
    .filter((c) => c.type === 'national')
    .map((c) => ({ slug: c.slug }));
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <SelecaoSlugClient params={params} />;
}