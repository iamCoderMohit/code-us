interface Input {
    title: string,
    content: string,
    isRev?: boolean
}

export default function Feature({title, content, isRev}: Input) {
    return (
        <div className={`flex ${isRev && "flex-row-reverse"}`}>
            <h1 className={`w-1/2 text-4xl font-medium ${!isRev ? "border-r" : "border-l pl-5"} border-white/40`}>{title}</h1>
            <h1 className={`w-1/2 text-2xl opacity-80 ${!isRev && "pl-5"}`}>{content}</h1>
        </div>
    )
}