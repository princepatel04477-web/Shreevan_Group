import React from "react";
import { notFound } from "next/navigation";
import { getProduct, getPublicProducts } from "@/lib/catalogue";
import { TechnicalDataSheet } from "@/components/formulary";
import { ModalWrapper } from "@/components/formulary/ModalWrapper";

interface ModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const products = getPublicProducts();
  return products.map((p) => ({
    id: p.id,
  }));
}

export default async function InterceptedProductModal({ params }: ModalPageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <ModalWrapper>
      <TechnicalDataSheet product={product} isModal={true} />
    </ModalWrapper>
  );
}
