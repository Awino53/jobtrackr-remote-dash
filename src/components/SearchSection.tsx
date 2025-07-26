import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface SearchSectionProps {
  onSearch: (query: string, category: string) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "Software Development",
    "Customer Service",
    "Design",
    "Marketing",
    "Sales",
    "Product",
    "Data Science",
    "DevOps",
    "QA",
    "Writing"
  ];

  const handleSearch = () => {
    onSearch(searchQuery, category);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="gradient-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect 
            <span className="gradient-primary bg-clip-text text-transparent"> Remote Job</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of remote opportunities and track your applications all in one place
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-6 shadow-lg border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search jobs (e.g., React Developer, Product Manager)"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
              
              <div className="md:col-span-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Button 
                  onClick={handleSearch}
                  className="w-full gradient-primary text-primary-foreground"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Popular searches:</span>
              {["React", "Python", "Product Manager", "UI/UX Designer", "Data Analyst"].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setSearchQuery(term);
                    onSearch(term, category);
                  }}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;