export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="p-8">
            <h1>Profile Page</h1>
            <p>ID: {params.id}</p>
        </div>
    );
}