export default function Header({ name }: { name: string }) {
    return (
        <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-800">Xin chào, {name}!</h1>
        <div className="w-full h-16 bg-gradient-to-r from-blue-200 via-purple-100 to-yellow-100 rounded-lg mb-6"></div>
        </div>
    )
}