import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, LogIn } from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { mockUsers } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '../../context/NavigationContext';

export function RecommendationSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(mockUsers);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { navigateWithMode } = useNavigation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = query 
      ? mockUsers.filter(user => 
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.title?.toLowerCase().includes(query.toLowerCase())
        )
      : mockUsers;
    setSearchResults(filtered);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Write a Recommendation</CardTitle>
            <CardDescription>Connect and share professional recommendations</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="max-w-sm mx-auto space-y-4">
              <LogIn className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-lg font-semibold">Sign in to write recommendation</h3>
              <Button 
                onClick={() => navigateWithMode('sign-in', '/write-recommendation')}
                className="bg-[#52789e] hover:bg-[#6b9cc3] w-full"
              >
                Sign In to Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Write a Recommendation</CardTitle>
          <CardDescription>Search for someone you'd like to recommend</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or title..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {searchResults.map((user) => (
                <Card 
                  key={user.id} 
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => navigate(`/write-recommendation/${user.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{user.name}</div>
                        {user.title && (
                          <div className="text-sm text-muted-foreground">{user.title}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {searchResults.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No results found
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}