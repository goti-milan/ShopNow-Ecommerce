import Link from "next/link";
import { NOTIFICATIONS } from "@/utils/notifications";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function NotificationsPage() {
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Notifications
            </h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread • {NOTIFICATIONS.length} total
            </p>
          </div>

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/account/orders">Go to Orders</Link>
          </Button>
        </div>

        <div className="space-y-3">
          {NOTIFICATIONS.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-sm text-muted-foreground">
                You&apos;re all caught up.
              </p>
            </Card>
          ) : (
            NOTIFICATIONS.map((n) => (
              <Card key={n.id} className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1.5 h-2.5 w-2.5 rounded-full shrink-0",
                      n.read ? "bg-muted-foreground/30" : "bg-primary"
                    )}
                    aria-hidden="true"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className={cn(
                          "text-sm sm:text-base truncate",
                          n.read ? "text-foreground" : "font-medium text-foreground"
                        )}
                      >
                        {n.title}
                      </p>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {n.time}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      {n.message}
                    </p>

                    {n.href ? (
                      <div className="mt-3">
                        <Button asChild variant="ghost" className="px-0 h-auto">
                          <Link href={n.href}>Open</Link>
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
