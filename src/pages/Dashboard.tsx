import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Clock, CheckCircle, TrendingUp, ExternalLink } from "lucide-react";

const Dashboard = () => {
  // Mock data for saved jobs and applications
  const mockApplications = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      status: "Applied",
      appliedDate: "2024-01-15",
      url: "https://example.com/job/1"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      status: "Interviewing",
      appliedDate: "2024-01-10",
      url: "https://example.com/job/2"
    },
    {
      id: 3,
      title: "UX Designer",
      company: "DesignStudio",
      status: "Offered",
      appliedDate: "2024-01-05",
      url: "https://example.com/job/3"
    },
    {
      id: 4,
      title: "Frontend Engineer",
      company: "WebAgency",
      status: "Applied",
      appliedDate: "2024-01-12",
      url: "https://example.com/job/4"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Interviewing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Offered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Applied":
        return <Clock className="w-4 h-4" />;
      case "Interviewing":
        return <Briefcase className="w-4 h-4" />;
      case "Offered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const stats = {
    totalApplications: mockApplications.length,
    applied: mockApplications.filter(app => app.status === "Applied").length,
    interviewing: mockApplications.filter(app => app.status === "Interviewing").length,
    offered: mockApplications.filter(app => app.status === "Offered").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Job Application Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your job applications</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">{stats.totalApplications}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applied</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.applied}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Interviewing</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.interviewing}</p>
                </div>
                <Briefcase className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Offers</p>
                  <p className="text-2xl font-bold text-green-600">{stats.offered}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Your Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{application.title}</h3>
                      <p className="text-muted-foreground">{application.company}</p>
                      <p className="text-sm text-muted-foreground">
                        Applied on {new Date(application.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                      {getStatusIcon(application.status)}
                      {application.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={application.url} target="_blank" rel="noopener noreferrer">
                        View Job <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {mockApplications.length === 0 && (
              <div className="text-center py-8">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by browsing jobs and saving the ones you're interested in
                </p>
                <Button asChild>
                  <a href="/">Browse Jobs</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;