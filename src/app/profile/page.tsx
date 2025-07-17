"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react"
import { toast } from "sonner";

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

  if (loading || !form) return <div className="p-8">Loading...</div>;

  return (
    <div className="mx-auto max-w-screen-md p-8">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={"https://avatar.vercel.sh/" + (session?.user?.email)}
          alt="Profile Icon"
          className="w-20 h-20 rounded-full border object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          {!editMode && (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </div>
      </div>
      <form
        className="space-y-6"
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
          <label className="block mb-1 font-medium" htmlFor="session">
            Session (202X)
          </label>
          <Input
            id="session"
            name="session"
            placeholder="Session"
            value={form.session || ""}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
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
          <div className="flex gap-4 mt-6">
            <Button type="submit" variant="default">
              Save
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
