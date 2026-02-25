import StoreDetailClient from "./StoreDetailClient";
import { notFound } from "next/navigation";

export default async function StorePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        notFound();
    }

    return (
        <main>
            <StoreDetailClient storeId={id} />
        </main>
    );
}
