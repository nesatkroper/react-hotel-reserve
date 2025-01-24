import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { X } from "lucide-react";

const NotificationSheet = () => {
  const [date, setDate] = useState(new Date());
  const [item, setItem] = useState(20);
  return (
    <>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notification and alert order ...</SheetTitle>
        </SheetHeader>
        <Separator className="my-3" />
        <ScrollArea className="h-[85vh] w-full rounded-xl border-y ">
          {Array?.from({ length: item })?.map((_, index) => (
            <Card key={index} className="mb-3">
              <CardHeader className="p-2 px-3 pb-0">
                <CardTitle>
                  <div className="flex justify-between items-center">
                    <p className="underline">Order</p>
                    <p className="font-normal">
                      {date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="outline" size="icon" className="p-0">
                            <X className="text-red-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove and Reject this Notification.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardTitle>
                <CardDescription>
                  {index % 2 ? "Room Reservation" : "Product Order"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex justify-between">
                  <p>Card Content</p>
                  <Button className="h-[28px] px-2">Confirm</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
        <Separator className="my-3" />
        <Button onClick={() => setItem(0)}>Clear all...</Button>
      </SheetContent>
    </>
  );
};

export default NotificationSheet;
