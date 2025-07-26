import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company_name: string;
  job_type: string;
  candidate_required_location: string;
  category: string;
  publication_date: string;
  url: string;
  description: string;
  tags?: string[];
}

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for initial display
  const mockJobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company_name: "TechFlow Inc.",
      job_type: "Full-time",
      candidate_required_location: "Anywhere",
      category: "Software Development",
      publication_date: "2024-01-20",
      url: "https://example.com/job/1",
      description: "We're looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern web technologies. You'll be working on cutting-edge projects with a collaborative team.",
      tags: ["React", "TypeScript", "JavaScript", "CSS", "Node.js"]
    },
    {
      id: 2,
      title: "Product Manager - Remote",
      company_name: "InnovateCorp",
      job_type: "Full-time",
      candidate_required_location: "US/Europe",
      category: "Product",
      publication_date: "2024-01-19",
      url: "https://example.com/job/2",
      description: "Join our product team to define and execute product strategy for our SaaS platform. We need someone with strong analytical skills and experience in agile development.",
      tags: ["Product Strategy", "Agile", "Analytics", "SaaS"]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company_name: "DesignStudio Pro",
      job_type: "Full-time",
      candidate_required_location: "Remote",
      category: "Design",
      publication_date: "2024-01-18",
      url: "https://example.com/job/3",
      description: "Looking for a creative UX/UI Designer to create exceptional user experiences. Experience with Figma, user research, and design systems required.",
      tags: ["Figma", "User Research", "Design Systems", "Prototyping"]
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company_name: "CloudTech Solutions",
      job_type: "Full-time",
      candidate_required_location: "Global",
      category: "DevOps",
      publication_date: "2024-01-17",
      url: "https://example.com/job/4",
      description: "We need a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. Experience with AWS, Docker, and Kubernetes is essential.",
      tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"]
    },
    {
      id: 5,
      title: "Data Scientist",
      company_name: "DataInsights Ltd",
      job_type: "Full-time",
      candidate_required_location: "Remote",
      category: "Data Science",
      publication_date: "2024-01-16",
      url: "https://example.com/job/5",
      description: "Join our data science team to build ML models and extract insights from large datasets. Python, SQL, and machine learning experience required.",
      tags: ["Python", "SQL", "Machine Learning", "Pandas", "Scikit-learn"]
    },
    {
      id: 6,
      title: "Marketing Manager",
      company_name: "GrowthCorp",
      job_type: "Full-time",
      candidate_required_location: "US",
      category: "Marketing",
      publication_date: "2024-01-15",
      url: "https://example.com/job/6",
      description: "Lead our digital marketing efforts including content marketing, SEO, and paid advertising. Experience with marketing automation tools preferred.",
      tags: ["Digital Marketing", "SEO", "Content Marketing", "Analytics"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setJobs(mockJobs);
        setError(null);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = async (query: string, category: string) => {
    setLoading(true);
    try {
      // Simulate search
      await new Promise(resolve => setTimeout(resolve, 500));
      let filteredJobs = mockJobs;
      
      if (query) {
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company_name.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (category) {
        filteredJobs = filteredJobs.filter(job => job.category === category);
      }
      
      setJobs(filteredJobs);
      setCurrentPage(1);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <SearchSection onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Remote Job Opportunities</h2>
            <p className="text-muted-foreground">
              {loading ? 'Loading...' : `${jobs.length} jobs found`}
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-destructive">{error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading amazing opportunities...</span>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && (
          <>
            {jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse all categories
                </p>
                <Button onClick={() => handleSearch('', '')}>
                  Show All Jobs
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
