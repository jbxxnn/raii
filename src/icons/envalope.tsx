interface EnvalopeProps {
    width?: number
    height?: number
    className?: string
}

export const Envalope = ({ width = 24, height = 25, className }: EnvalopeProps) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect x="2" y="4.5" width="20" height="16" rx="3" fill="#5E4AE3" />
            <path
                d="M10.91 12.7915L2 7C2 5.61929 3.11929 4.5 4.5 4.5H19.5C20.8807 4.5 22 5.61929 22 7L13.09 12.7915C12.4272 13.2223 11.5728 13.2223 10.91 12.7915Z"
                fill="#9884ED"
            />
        </svg>
    )
}
