"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateUser } from "@/lib/actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserRole = ({ role, id }: { role: "ADMIN" | "USER"; id: string }) => {
  const router = useRouter();

  const [currentRole, setCurrentRole] = useState<"ADMIN" | "USER">(role);

  const handleRoleChange = async (value: "ADMIN" | "USER") => {
    const response = await updateUser(id, { role: value });

    if (response?.success) {
      toast.success("Success", {
        description: response.message,
      });
      setCurrentRole(value);
    } else {
      toast.error("Error", {
        description: response?.message,
      });
      setCurrentRole(role);
    }

    console.log(role, currentRole);

    router.refresh();
  };

  return (
    <Select value={currentRole} onValueChange={handleRoleChange}>
      <SelectTrigger
        className="border-none shadow-none outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:shadow-none cursor-pointer"
        size="sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ADMIN">
          <Badge
            variant="outline"
            className="border border-amber-400 text-amber-400 hover:text-amber-400 text-center uppercase"
          >
            Admin
          </Badge>
        </SelectItem>
        <SelectItem value="USER">
          <Badge
            variant="outline"
            className="border border-gray-400 text-gray-400 hover:text-gray-400 text-center uppercase"
          >
            User
          </Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserRole;
