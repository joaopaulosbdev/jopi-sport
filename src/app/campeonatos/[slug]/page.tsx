import { initialCategories } from '@/data/categories';
import ChampionshipSlugClient from './client';

export function generateStaticParams() {
  return initialCategories
    .filter((c) => c.type === 'championship')
    .map((c) => ({ slug: c.slug }));
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ChampionshipSlugClient params={params} />;
}