import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getPortfolioData, savePortfolioData } from "@/data/portfolioData";
import { toast } from "@/components/ui/use-toast";

export default function AdminProfile() {
  const portfolioData = getPortfolioData();
  const [profile, setProfile] = useState({
    ...portfolioData.profile,
    avatarUrl: portfolioData.profile.avatarUrl || "/Jaykumar.jpg", // Default avatar
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const newData = { ...portfolioData, profile };
    savePortfolioData(newData);

    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your basic profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Professional Title
          </label>
          <Input
            id="title"
            name="title"
            value={profile.title}
            onChange={handleChange}
            placeholder="e.g. Full Stack Developer"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="summary" className="text-sm font-medium">
            Summary
          </label>
          <Textarea
            id="summary"
            name="summary"
            value={profile.summary}
            onChange={handleChange}
            placeholder="A brief summary about yourself"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="avatarUrl" className="text-sm font-medium">
            Avatar URL
          </label>
          <Input
            id="avatarUrl"
            name="avatarUrl"
            value={profile.avatarUrl || ""}
            onChange={handleChange}
            placeholder="e.g. /Jaykumar.jpg or https://..."
          />
          {profile.avatarUrl && (
            <div className="mt-2">
              <img
                src={profile.avatarUrl}
                alt="Avatar preview"
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
