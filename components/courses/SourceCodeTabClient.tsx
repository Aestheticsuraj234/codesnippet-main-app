"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { GithubIcon, UsersIcon, StarIcon, GitForkIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  sourceCodeUrl: string | null;
}

interface GitHubData {
  user: {
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
  };
  repo: {
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    clone_url: string;
  };
}

const SourceCodeTabClient = ({ sourceCodeUrl }: Props) => {
  const [githubData, setGitHubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGitHubData = async (repoUrl: string) => {
      try {
        const repoPath = new URL(repoUrl).pathname.slice(1);
        const [owner, repo] = repoPath.split('/');

        const [userResponse, repoResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${owner}`, { next: { revalidate: 3600 } }),
          fetch(`https://api.github.com/repos/${owner}/${repo}`, { next: { revalidate: 3600 } })
        ]);

        if (!userResponse.ok || !repoResponse.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const userData = await userResponse.json();
        const repoData = await repoResponse.json();

        setGitHubData({
          user: {
            login: userData.login,
            avatar_url: userData.avatar_url,
            name: userData.name,
            bio: userData.bio,
            followers: userData.followers,
            following: userData.following,
          },
          repo: {
            name: repoData.name,
            description: repoData.description,
            stargazers_count: repoData.stargazers_count,
            forks_count: repoData.forks_count,
            html_url: repoData.html_url,
            clone_url: repoData.clone_url,
          },
        });
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setGitHubData(null);
      } finally {
        setLoading(false);
      }
    };

    if (sourceCodeUrl) {
      fetchGitHubData(sourceCodeUrl);
    }
  }, [sourceCodeUrl]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">GitHub Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <ProfileSkeleton />
        ) : githubData ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src={githubData.user.avatar_url}
                alt={`${githubData.user.name}'s avatar`}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">{githubData.user.name}</h2>
                <p className="text-muted-foreground">@{githubData.user.login}</p>
              </div>
            </div>
            <p className="text-muted-foreground">{githubData.user.bio}</p>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <UsersIcon className="w-5 h-5 mr-2" />
                <span>{githubData.user.followers} followers</span>
              </div>
              <div className="flex items-center">
                <UsersIcon className="w-5 h-5 mr-2" />
                <span>{githubData.user.following} following</span>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{githubData.repo.name}</h3>
              <p className="text-muted-foreground mb-4">{githubData.repo.description}</p>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 mr-2" />
                  <span>{githubData.repo.stargazers_count} stars</span>
                </div>
                <div className="flex items-center">
                  <GitForkIcon className="w-5 h-5 mr-2" />
                  <span>{githubData.repo.forks_count} forks</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Error fetching GitHub data. Please check the repository URL and try again.</p>
        )}
      </CardContent>
      {githubData && (
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" asChild>
            <Link href={githubData.repo.html_url} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="w-4 h-4 mr-2" />
              Visit
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default SourceCodeTabClient;

function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-muted rounded-full" />
        <div className="space-y-2">
          <div className="h-4 w-[200px] bg-muted rounded" />
          <div className="h-4 w-[150px] bg-muted rounded" />
        </div>
      </div>
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-[300px] bg-muted rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-[200px] bg-muted rounded" />
      </div>
    </div>
  );
}
