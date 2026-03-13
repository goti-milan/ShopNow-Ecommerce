import { ReactNode } from "react";

type EmptyStateProps = {
    icon: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
};

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                {icon}
            </div>
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            {description ? (
                <p className="text-muted-foreground mb-8">{description}</p>
            ) : null}
            {action ? <div className="flex justify-center">{action}</div> : null}
        </div>
    );
}
