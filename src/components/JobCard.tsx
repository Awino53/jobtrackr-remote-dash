import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ExternalLink, MapPin, Clock, Building } from "lucide-react";
import { useState } from "react";

interface JobCardProps {
  job: {
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
  };
}

const JobCard = ({ job }: JobCardProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="job-card-hover h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold leading-tight mb-2 line-clamp-2">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Building className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{job.company_name}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`flex-shrink-0 ${isSaved ? 'text-red-500' : 'text-muted-foreground'}`}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {job.job_type}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {job.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{job.candidate_required_location || 'Remote'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(job.publication_date)}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {truncateDescription(job.description.replace(/<[^>]*>/g, ''))}
          </p>

          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {job.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                  {tag}
                </Badge>
              ))}
              {job.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{job.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? 'Saved' : 'Save Job'}
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              Apply <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;