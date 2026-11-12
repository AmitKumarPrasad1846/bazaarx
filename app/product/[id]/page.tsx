import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SEED_LISTINGS } from '@/data/listings';
import { ProductDetailClient } from '@/components/listing/ProductDetailClient';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return SEED_LISTINGS.map((listing) => ({
    id: listing.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const listing = SEED_LISTINGS.find((item) => item.id === params.id);
  if (!listing) {
    return {
      title: 'Item Not Found · BazaarX',
    };
  }

  const priceText =
    listing.listingType === 'rent'
      ? `₹${listing.rentPerDay || listing.price}/day`
      : `₹${listing.price.toLocaleString('en-IN')}`;

  return {
    title: `${listing.title} (${priceText}) · BazaarX`,
    description: `${listing.title} in ${listing.city}, ${listing.area}. ${listing.description.slice(0, 150)}...`,
    openGraph: {
      title: `${listing.title} | BazaarX`,
      description: listing.description,
      images: [
        {
          url: listing.images[0],
          width: 1200,
          height: 630,
          alt: listing.title,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const listing = SEED_LISTINGS.find((item) => item.id === params.id);

  if (!listing) {
    notFound();
  }

  const similarListings = SEED_LISTINGS.filter(
    (item) => item.category === listing.category && item.id !== listing.id
  ).slice(0, 6);

  return (
    <ProductDetailClient
      listing={listing}
      similarListings={similarListings}
    />
  );
}

