"use client";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  HandHelping,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/store/Auth";
import { api } from "@/helpers/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import BeVolunteer from "./BeVolunteer";
import Link from "next/link";
import { BloodRequest } from "@/types/bloodRequest";
import { AxiosError } from "axios";

interface Requests {
  bloodRequests: BloodRequest[];
  hasNext: boolean;
  hasPrev: boolean;
  currentPage: number;
  totalPages: number;
}

const validBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const statusOptions = ["all", "pending", "accepted", "rejected"];
const sortOptions = ["newest", "oldest"];

function Requests() {
  const userBG = useAuthStore((state) => state.bloodGroup);
  const [requests, setRequests] = useState<Requests | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    bloodGroup: userBG || "all",
    status: "all",
    sort: "newest",
  });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      let url = "/blood-requests";

      if (filters.bloodGroup !== "all") {
        url = `/blood-requests/blood-group?bloodGroup=${filters.bloodGroup}`;
      }
      if (filters.status !== "all") {
        url = `/blood-requests/status?status=${filters.status}`;
      }

      url += `${url.includes("?") ? "&" : "?"}page=${currentPage}`;
      const response = await api.get(url);

      if (response.status === 200) {
        const data = response.data.data;
        if (filters.sort === "oldest") {
          data.bloodRequests = data.bloodRequests.reverse();
        }
        setRequests(data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  return (
    <div className="container px-1 py-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Select
          value={filters.bloodGroup}
          onValueChange={(value) => handleFilterChange("bloodGroup", value)}
        >
          <SelectTrigger className="w-[120px] bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-primary">
            <SelectValue placeholder="Blood Group" />
          </SelectTrigger>
          <SelectContent className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
            <SelectItem value="all">All Groups</SelectItem>
            {validBloodGroups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger className="w-[120px] bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-secondary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sort}
          onValueChange={(value) => handleFilterChange("sort", value)}
        >
          <SelectTrigger className="w-[120px] bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-accent">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <Card className="bg-red-50 dark:bg-red-800 border-red-200 dark:border-red-500">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-300">{error}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-3 mb-6">
            {requests?.bloodRequests.map((request) => (
              <Card
                key={request._id}
                className="hover:shadow transition-shadow dark:bg-dark-bg overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <Link
                    href={`/blood-bridge/request/${request._id}`}
                    className="flex flex-col sm:flex-row sm:items-center flex-grow hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {/* Left side - Blood type and urgency (INSIDE the link) */}
                    <div className="flex items-center p-3 sm:w-1/6 sm:justify-center sm:border-r border-border">
                      <div className="flex flex-row md:flex-col items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-lg font-bold border-primary text-primary dark:border-dark-text dark:text-dark-text"
                        >
                          {request.bloodGroup}
                        </Badge>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {/* Middle content section */}
                    <CardContent className="py-3 px-4 sm:flex-1">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm text-gray-600 dark:text-dark-text line-clamp-2">
                          {request.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {request.address.city}, {request.address.district}
                        </p>
                      </div>
                    </CardContent>
                  </Link>

                  {/* Right section with status and Be Volunteer button (OUTSIDE the link) */}
                  <CardFooter className="px-3 py-2 sm:ml-auto sm:w-2/6 flex items-center justify-between sm:border-l border-border">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center text-green-500 text-sm">
                        <HandHelping className="w-4 h-4 mr-1" />
                        {request.volunteers?.length}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs"
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Be Volunteer button */}
                    <div className="flex items-center">
                      {request.bloodGroup === userBG &&
                        request.status === "pending" && (
                          <BeVolunteer id={request._id} />
                        )}
                    </div>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>

          {requests && requests.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={!requests.hasPrev}
                className="border-secondary text-secondary dark:border-light-text dark:text-light-text"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Prev
              </Button>
              <span className="flex items-center px-3 text-sm">
                {requests.currentPage}/{requests.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={!requests.hasNext}
                className="border-secondary text-secondary dark:border-light-text dark:text-light-text"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Requests;
