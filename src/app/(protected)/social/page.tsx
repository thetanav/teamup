export default async function SocialPage() {
  return (
    <section className="flex min-h-[80vh] flex-1 flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Social Features
          </h1>
          <h2 className="text-2xl font-semibold text-gray-300">Coming Soon</h2>
        </div>

        <div className="max-w-lg space-y-4">
          <p className="text-lg text-gray-400">
            We're building an amazing social experience to help you connect with
            your teammates and the community.
          </p>

          <div className="space-y-2 text-sm text-gray-500">
            <p>🤝 Connect with team members</p>
            <p>💬 Team chat and messaging</p>
            <p>📱 Activity feeds and updates</p>
            <p>🎉 Social interactions and reactions</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-gray-700 bg-gray-800/50 p-6">
          <p className="text-sm text-gray-400">
            Stay tuned for updates! This feature is currently in development.
          </p>
        </div>
      </div>
    </section>
  );
}
