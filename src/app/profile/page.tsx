"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react"
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";
import DpUpload from "@/components/dpupload";

export default function Page() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session)
      fetch("/api/profile")
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          setForm(data);
          setLoading(false);
        });
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setForm(profile);
    setEditMode(false);
  };

  const handleSave = async () => {
    if (!form) return;
    // form.image = "https://avatar.vercel.sh/" + (session?.user?.email);
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const updated = await res.json();
    setProfile(updated);
    setForm(updated);
    setEditMode(false);
    toast.success("Updated")
  };

  const refreshProfile = async () => {
    if (session) {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfile(data);
      setForm(data);
    }
  };

  if (loading || !form) return <div className="p-8">Loading...</div>;

  return (
    <div className="mx-auto max-w-screen-md p-8">
      <div className="flex items-start gap-6 mb-8">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={form.image ?? `https://avatar.vercel.sh/${session?.user?.email}`}
              alt="Profile Icon"
              className="w-20 h-20 rounded-full border-2 border-border object-cover transition-all duration-200 group-hover:border-primary/50"
            />
            {editMode && (
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          {editMode && (
            <DpUpload onUploadSuccess={refreshProfile} />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Profile</h2>
            {!editMode && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </div>
          {editMode && (
            <p className="text-sm text-muted-foreground">
              Click the upload button below to change your profile picture
            </p>
          )}
        </div>
      </div>
      <form
        className={`space-y-6 transition-all duration-200 ${editMode ? 'bg-muted/30 rounded-lg p-6 border' : ''}`}
        onSubmit={e => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            value={form.name || ""}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="college">
            College
          </label>
          <Input
            id="college"
            name="college"
            placeholder="College"
            value={form.college || ""}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="course">
            Course
          </label>
          <Input
            id="course"
            name="course"
            placeholder="Course"
            value={form.course || ""}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="city">
            City
          </label>
          <Input
            id="city"
            name="city"
            placeholder="City"
            value={form.city || ""}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="available">
            Available for Hackthons
          </label>
          <div className="flex items-center gap-3">
            <Checkbox id="available" name="available" disabled={!editMode} checked={form.available} onCheckedChange={(checked) => {
              setForm({ ...form, available: checked });
            }} />
            <label className="block text-sm font-medium" htmlFor="terms">Available</label>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio || ""}
            onChange={handleChange}
            disabled={!editMode}
            rows={3}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="skills">
            Skills (comma separated)
          </label>
          <Input
            id="skills"
            name="skills"
            value={form.skills || ""}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </div>
        {editMode && (
          <div className="flex gap-4 mt-8 pt-6 border-t">
            <Button type="submit" variant="default" className="flex-1">
              Save Changes
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
