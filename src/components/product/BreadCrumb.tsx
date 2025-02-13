import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="text-sm mb-6">
      <nav className="flex items-center space-x-2 text-gray-500">
        {items.map((item, index) => (
          <span key={index}>
            {index > 0 && <span className="mx-2">/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-900">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  )
}

