import { sampleProducts } from '@/data/sample-products';
import ProductDetailClient from './client';

export function generateStaticParams() {
  return sampleProducts.map((p) => ({ id: p.id }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ProductDetailClient params={params} />;
}