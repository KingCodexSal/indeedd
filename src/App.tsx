import { useState } from "react";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBriefcase,
  faEdit,
  faTrash,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "user" },
];

const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Tech Corp",
    location: "Remote",
    status: "Open",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Design Studio",
    location: "New York",
    status: "Open",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "StartUp Inc",
    location: "San Francisco",
    status: "Open",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState<"users" | "jobs">("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="h-6 w-6 text-white hover:text-black"
            />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={currentPage === "users" ? "default" : "ghost"}
              className={cn(
                "w-full focus:outline-none justify-start text-lg transition-all duration-200",
                currentPage === "users"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                  : "text-white hover:text-gray-900 hover:bg-gray-100"
              )}
              onClick={() => {
                setCurrentPage("users");
                setSidebarOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-3 h-5 w-5" />
              Users
            </Button>
            <Button
              variant={currentPage === "jobs" ? "default" : "ghost"}
              className={cn(
                "focus:outline-none w-full justify-start text-lg transition-all duration-200",
                currentPage === "jobs"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                  : "text-white hover:text-gray-900 hover:bg-gray-100"
              )}
              onClick={() => {
                setCurrentPage("jobs");
                setSidebarOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faBriefcase} className="mr-3 h-5 w-5" />
              Jobs
            </Button>
          </nav>
        </ScrollArea>
      </div>

      <div className="flex-1 w-full">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="px-4 md:px-8 py-6 flex items-center justify-between w-full">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FontAwesomeIcon
                icon={faBars}
                className="h-6 w-6 text-white hover:text-black"
              />
            </Button>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              {currentPage === "users" ? "User Management" : "Available Jobs"}
            </h2>
            <div className="w-10 md:hidden" />
          </div>
        </header>

        <main className="w-screen md:w-[78.5vw] overflow-hidden p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full">
            <ScrollArea className="w-full">
              {currentPage === "users" ? (
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="font-semibold text-gray-900">
                        Name
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Email
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Role
                      </TableHead>
                      <TableHead className="text-right font-semibold text-gray-900">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              "px-4 py-1 rounded-full font-medium",
                              user.role === "admin"
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="bg-black text-white hover:bg-white hover:text-black border border-black transition-colors"
                            title="Edit user"
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="h-4 w-4"
                            />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="bg-black text-white hover:bg-white hover:text-black border border-black transition-colors"
                            title="Delete user"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="h-4 w-4 text-red-600"
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Table className="overflow-hidden">
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="font-semibold text-gray-900">
                        Job Title
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Company
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Location
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Status
                      </TableHead>
                      <TableHead className="text-right font-semibold text-gray-900">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockJobs.map((job) => (
                      <TableRow key={job.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-4 py-1 rounded-full font-medium">
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                            size="sm"
                          >
                            Accept Job
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
