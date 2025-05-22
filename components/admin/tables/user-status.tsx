"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateUserStatus } from "@/lib/actions/users";
import { toast } from "sonner";

const UserStatus = ({ status, id }: { status: string; id: string }) => {
  const handleStatusChange = async (value: string) => {
    const response = await updateUserStatus(id, value as IUser["status"]);

    if (response?.success) {
      toast.success("Success", {
        description: response.message,
      });
    } else {
      toast.error("Error", {
        description: response?.message,
      });
    }
  };

  return (
    <Select defaultValue={status} onValueChange={handleStatusChange}>
      <SelectTrigger
        className="border-none shadow-none outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:shadow-none cursor-pointer"
        size="sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">
          <Badge
            variant="outline"
            className="border border-blue-400 text-blue-400 hover:text-blue-400 text-center uppercase"
          >
            Pending
          </Badge>
        </SelectItem>
        <SelectItem value="APPROVED">
          <Badge
            variant="outline"
            className="border border-green-500 text-green-500 hover:text-green-500 text-center uppercase"
          >
            Approved
          </Badge>
        </SelectItem>
        <SelectItem value="REJECTED">
          <Badge
            variant="outline"
            className="border border-red-400 text-red-400 hover:text-red-400 text-center uppercase"
          >
            Rejected
          </Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserStatus;
