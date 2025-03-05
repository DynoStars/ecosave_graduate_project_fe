export default function Header({ name }: { name: string }) {
    return (
        <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-800">Xin chào, {name}!</h1>
        <div className="h-12 bg-blue-100 rounded-lg mt-2"></div>
        </div>
    )
}