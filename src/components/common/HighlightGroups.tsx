import Image from "next/image";
import Link from "next/link";

export type HighlightItem = {
    id: string | number;
    title: string;
    subtitle: string;
    image: string;
    meta?: string;
    tag?: string;
    href?: string;
};

export type HighlightGroup = {
    id: string;
    label: string;
    description?: string;
    items: HighlightItem[];
};

export default function HighlightGroups({ groups }: { groups: HighlightGroup[] }) {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {groups.map((group) => (
                <section
                    key={group.id}
                    className="rounded-3xl border border-border bg-background/90 p-5 shadow-sm"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{group.label}</p>
                            <h3 className="text-lg font-semibold text-foreground">{group.description ?? "Curated picks"}</h3>
                        </div>
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                            {group.items.length} items
                        </span>
                    </div>

                    <div className="space-y-3">
                        {group.items.map((item) => {
                            const content = (
                                <article className="flex items-center gap-3 rounded-2xl border border-transparent bg-muted/80 p-3 transition hover:border-border hover:bg-background">
                                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
                                            {item.tag && (
                                                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                                                    {item.tag}
                                                </span>
                                            )}
                                        </div>
                                        <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>
                                        {item.meta && <p className="text-[11px] text-muted-foreground">{item.meta}</p>}
                                    </div>
                                </article>
                            );

                            if (!item.href) return <div key={item.id}>{content}</div>;

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="block rounded-2xl transition hover:shadow-sm"
                                >
                                    {content}
                                </Link>
                            );
                        })}
                    </div>
                </section>
            ))}
        </div>
    );
}
